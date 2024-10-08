import dotenv from "dotenv";

import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
dotenv.config({
    path:"./env"
 })
const app=express();

                //MiddleWares
// app.use() //used for middlewares and configurations
app.use(cors()); //set the cors Origin mean which orign can talk to the app
app.use(cors ({
    origin: process.env.CORS_ORIGIN, //specify Origin which can talk to backend
    credentials:true,
}))
app.use(express.json({limit:'16kb'}))   //used to limit the json data acceptance in request
app.use(express.urlencoded({extended:true,limit:"26kb"})) //used to handle URL query parameter
app.use(express.static('public'))// used to store files in that specified location
app.use(cookieParser())

//             Custom Middlewares
        // contain 4 parameters (err,req,res,next)
        //     => next -> used as flag to pass to the next middleware or res function.


            //routes
import userRouter from "./routes/user.routes.js"

const prefix='/api/v1'
//routes declaration
app.use(`/api/v1/users`,userRouter)
export {app}