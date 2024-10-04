import express from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import { dbconnector } from "./database/dbconector.js"
import messageroute from "./router/messagerouter.js"
import userrouter from "./router/userRouter.js"
import appoinmentrouter from "./router/appoinementrouter.js"
import { errormidleware } from "./middlewares/errormidleware.js"
const app=express()
// ai section ta aktu resarch korte baki ache.
config({path:"./config/config.env"});
app.use(
    cors({
        origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })),
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))
app.use("/api/v1/message",messageroute)
app.use("/api/v1/user",userrouter)
app.use("/api/v1/appoinement",appoinmentrouter)
dbconnector()
app.use(errormidleware)
export default app

 