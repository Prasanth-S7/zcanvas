import { Router, Request, Response } from "express";
import { loginMiddleware } from "../../middlwares/login";
import { prisma } from "@repo/db/client"

export const chatRouter:Router = Router();

chatRouter.post("/", loginMiddleware, async (req: Request, res: Response): Promise<any> => {
    const {roomId, message} = req.body;
    //@ts-ignore
    const userId = req.userId;
    const chat = await prisma.chat.create({
        data:{
            message: message,
            roomId: roomId,
            userId: userId
        },
        select:{
            message: true,
            userId: true,
            createdAt: true
        }
    })
    return res.status(200).json(chat)
})

