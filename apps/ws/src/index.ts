import WebSocket, { WebSocketServer } from 'ws';
import { PORT } from './secrets';
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common/secrets"

const wss = new WebSocketServer({port: PORT }, () => {
    console.log(`Websocket server started on PORT:${PORT}`)
});


wss.on('error', console.error);

wss.on('connection', (ws, req) =>  {

  const url = req.url?.split("?")[1];
  const queryParams = new URLSearchParams(url);
  const token =  queryParams.get("token")
  try{
    const decoded = jwt.verify(token as string, JWT_SECRET)
  }
  catch(error){
    ws.close();
    return;
  }
});

wss.on('message', (data) => {
  console.log('received: %s', data);
});