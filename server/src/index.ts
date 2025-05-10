import express from "express"
import cors   from "cors"
import { mainRouter } from "./router/mainRouter";

const app = express();









app.use(express.json());
app.use(cors({
    origin:"*"
}))


app.use('/api/v1/', mainRouter)








app.listen(3000,()=>{
    console.log("server is on")
})