import WebSocket, { WebSocketServer } from 'ws';
import { PORT } from './secrets';

const wss = new WebSocketServer({port: PORT }, () => {
    console.log(`Websocket server started on PORT:${PORT}`)
});


wss.on('error', console.error);

wss.on('connection', (ws) =>  {
  ws.send('something');
});

wss.on('message', (data) => {
  console.log('received: %s', data);
});