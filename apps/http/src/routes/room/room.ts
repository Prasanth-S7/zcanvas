import { Router, Request, Response } from "express";
import { loginMiddleware } from "../../middlwares/login";
import { createRoomSchema } from "@repo/common/zodSchema";
import { prisma } from "@repo/db/client";

export const roomRouter:Router = Router();

roomRouter.post(
  "/",
  loginMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    //@ts-ignore
    const parsedData = createRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(403).json({
        msg: "Incorrect inputs",
      });
    } else {
      //@ts-ignore
      const userId = req.userId;
      const { slug } = req.body;

      const isSlugExists = await prisma.room.findFirst({
        where: {
          slug: slug
        }
      })

      if(isSlugExists){
        return res.status(403).json({
          msg:"Slug already exists"
        })
      }
      const room = await prisma.room.create({
        data: {
          adminId: userId,
          slug: slug,
        },
        select: {
          id: true,
          slug: true
        },
      });

      return res.status(200).json({
        msg: "Room created successfully",
        roomId: room.id,
        slug: room.slug
      });
    }
  }
);

//get the roomId for a given slug

roomRouter.get("/slug/:slug", async (req: Request, res: Response): Promise<any> => {
  try{
    const slug = req.params.slug;
    const room = await prisma.room.findFirst({
      where:{
        slug: slug
      }
    })
    if(!room){
      return res.status(404).json({
        msg: "No room id found for the given slug"
      })
    }
    return res.status(200).json({
      msg: "Room id found for the given slug",
      roomId: room.id,
      createdAt: room.createdAt
    })
  }
  catch(error){
    return res.status(500).json({
      msg: "Internal server error"
    })
  }
})