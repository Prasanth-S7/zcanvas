import { Router, Request, Response } from "express";
import { loginMiddleware } from "../../middlwares/login";
import { prisma } from "@repo/db/src";

const chatRouter = Router();

chatRouter.post("/", loginMiddleware, async (req: Request, res: Response) => {
    const {roomId, message} = req.body;
    //@ts-ignore
    const userId = req.userId;
    const chat = await prisma.chat.create({
        data:{
            message: message,
            roomId: roomId,
            userId: userId
        }
    })
})

