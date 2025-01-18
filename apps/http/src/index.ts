import express from "express"
import { PORT } from "./secrets";
const app = express();
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server started on PORT:${PORT}`)
})