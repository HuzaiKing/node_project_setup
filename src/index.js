//  require('dotenv').config({path:'./env'}) //can be used but does not make consistency

import dotenv from "dotenv";
import getConnection from "./db/init.js";
import { app } from "./app.js";
 dotenv.config({
    path:"./env"
 })
 getConnection()
 .then(()=>{
    app.on("error",(err)=>{
        console.log("Error From Route",err)
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is Running at http://localhost:${process.env.PORT}`)
    })
 })
 .catch((err)=>{
    console.log("Mongo DB Connection is Failed",err)
 })
/*
import express from "express";
import mongoose from "mongoose";
import {DB_NAME} from "./constant";
const app = express();
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error",(err)=>{
           console.error("ERROR : ",err) 
        })
        app.listen(()=>{
            console.log("App is listening on PORT : ",process.env.PORT)
        })
    } catch (error) {
        console.error("ERROR : ",error)
        throw error
    }
})()
*/