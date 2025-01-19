import { Router, Request, Response } from "express";
import { loginMiddleware } from "../../middlwares/login";
import { prisma } from "@repo/db/src";

const roomRouter = Router();

roomRouter.post("/", loginMiddleware, async (req: Request, res: Response): Promise<any> => {
    //@ts-ignore
    const userId = req.userId
    const room = await prisma.room.create({
        data:{
            adminId: userId,
            slug: "lskdfn,"
        },
        select:{
            id: true
        }
    })

    return res.status(200).json({
        msg: "Room created successfully",
        roomId: room.id
    })
})
//get all chats of a particular room

roomRouter.get('/rooms/:slug/chats', async (req: Request, res: Response): Promise<any> => {

    const { slug } = req.params
    const room = await prisma.room.findFirst({
        where:{
            slug: slug
        },
        include:{
            chats : {
                include: {
                    user: true
                }
            }
        }
    })
    if(!room){
        return res.status(404).json({
            msg: "Room not found"
        })
    }
})