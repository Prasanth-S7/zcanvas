import { Router, Request, Response } from "express";
import { loginMiddleware } from "../../middlwares/login";
import { prisma } from "@repo/db/client";

export const chatRouter: Router = Router();

chatRouter.post(
  "/",
  loginMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { roomId, message } = req.body;
      //@ts-ignore
      const userId = req.userId;
      const chat = await prisma.chat.create({
        data: {
          message: message,
          roomId: roomId,
          userId: userId,
        },
        select: {
          message: true,
          userId: true,
          createdAt: true,
        },
      });
      return res.status(200).json(chat);
    } catch (error) {
      return res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
);

chatRouter.get(
  "/:roomId",
  async (req: Request, res: Response): Promise<any> => {
    const roomId = req.params.roomId;

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({
        msg: "Room not found",
      });
    }
    const chats = await prisma.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    console.log(chats);
    return res.status(200).json({
      msg: "Chats fetched Successfully",
      chats,
    });
  }
);
