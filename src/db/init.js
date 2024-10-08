            //ALways use DB connection in try catch

import mongoose, { get, mongo } from "mongoose";
import { DB_NAME } from "../constant.js";
                        //async method return a promise
const getConnection = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        // console.log("\n MongoDB Connected",connectionInstance)
    } catch (error) {
        console.log("MONGO Connection  Error",error)
        process.exit(1);
    }
}
export default getConnection;