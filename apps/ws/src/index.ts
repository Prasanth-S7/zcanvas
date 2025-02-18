import WebSocket, { WebSocketServer } from "ws";
import { PORT } from "./secrets";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/secrets";
import { prisma } from "@repo/db/client";

const wss = new WebSocketServer({ port: PORT }, () => {
  console.log(`Websocket server started on PORT:${PORT}`);
});

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token as string, JWT_SECRET);
    //@ts-ignore
    return decoded.id;
  } catch (error) {
    return null;
  }
}

interface User {
  ws: WebSocket;
  userId: string;
  rooms: string[];
}

const users: User[] = [];

wss.on("connection", (ws, req) => {
  const url = req.url?.split("?")[1];
  const queryParams = new URLSearchParams(url);
  const token = queryParams.get("token");
  console.log(token);
  const userId = checkUser(token as string);
  if (!userId) {
    console.log("closing ws");
    ws.close();
    return null;
  } else {
    console.log("connected");
    users.push({
      userId,
      rooms: [],
      ws,
    });
  }
  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data as unknown as string);
    if (parsedData.type === "join-room") {
      console.log("join-room");
      const user = users.find((user) => user.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }
    if (parsedData.type === "leave-room") {
      const user = users.find((user) => user.ws === ws);
      if (!user) {
        return null;
      }
      user.rooms = user?.rooms.filter((room) => room !== parsedData.roomId);
    }
    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

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
      
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
});
