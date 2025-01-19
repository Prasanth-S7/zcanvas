import { Router, Request, Response } from "express";
import { loginMiddleware } from "../../middlwares/login";
import { createRoomSchema } from "@repo/common/zodSchema";
import { prisma } from "@repo/db/client"

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
      const room = await prisma.room.create({
        data: {
          adminId: userId,
          slug: slug,
        },
        select: {
          id: true,
        },
      });

      return res.status(200).json({
        msg: "Room created successfully",
        roomId: room.id,
      });
    }
  }
);
//get all chats of a particular room

roomRouter.get(
  "/:slug/chats",
  async (req: Request, res: Response): Promise<any> => {
    const { slug } = req.params;
    const room = await prisma.room.findFirst({
      where: {
        slug: slug,
      },
      include: {
        chats: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!room) {
      return res.status(404).json({
        msg: "Room not found",
      });
    }
  }
);
