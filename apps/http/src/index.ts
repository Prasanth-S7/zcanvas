import express from "express"
import { PORT } from "./secrets";
import { userRouter } from "./routes/user/user";
import { chatRouter } from "./routes/chat/chat";
import { roomRouter } from "./routes/room/room";
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/room", roomRouter);


app.listen(PORT, ()=>{
    console.log(`Server started on PORT:${PORT}`)
})