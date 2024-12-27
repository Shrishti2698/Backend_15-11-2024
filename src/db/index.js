// APPROACH 2      --- to connect database

import mongoose from "mongoose";
// we'll connect database here, through mongoose. So we'll have to bring mongoose
import { DB_NAME } from "../constant.js";


const connectDB = async () => {
    try {
        const connectionInstance  = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // mongoose gives us a returned object. We can store it in a variable
        console.log(`\n mongoDB connected !! DB HOST:  ${connectionInstance.connection.host}`);
        // connectionInstance.connection.host - saare mongoDB ke url mei se, jahan pe connection  horaha hai wo lerhe hai
    }
    catch (error) {
      console.log("MONGODB connection error ", error);
      process.exit(1)  // read about it
    }
}

export default connectDB
 
// import this into src-> index.js