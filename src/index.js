// require('dotenv').config({path: './env'})  // common js
import dotenv from "dotenv"; // module js

import mongoose from "mongoose"; // module js
import {DB_NAME} from "./constant.js";
import connectDB from "./db/index.js";

dotenv.config({  // after importing, also needs to be configured
    path: './env'
})
// after this above code, "npm run dev" ("dev" 'coz be dev dependency we wrote in package.json)
connectDB()
// PROMISES --> .then .catch
.then(() => {
   app.on("error", (error) => { // we want to listen to errors, before we listen to app.listen()
      console.log("ERROR", error);
      throw error
    }),

    app.listen(process.env.PORT || 8000, () => {
      console.log(` Server is running at PORT ${process.env.PORT}`);
    }) // if our port is not found then use 8000
})
.catch((err) => {
   console.log("MONGO db connection failed!! ", err);
   
})






/*
import express from "express";
// As mongoose will connect to the database
// go check the documentation of mongoose
// But there's a catch in the documantation, dont go for that
// Instead, use async-await (as database is in other continent)
// And, use try-catch or promises (as problems may occur)

const app = express()
// function connectDB(){}
// connectDB()          --- we're not using this approach here

// using a JavaScript approach---  iffy
// ()() -> First () is the function and 2nd () shows that execute 1st () immediately. Below...

;( async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // copied from .env and constant.js

       app.on("error", (error) => {
         console.log("ERROR", error);
         throw error
       }) // on() is a listner. .on("error") is one type of listner. We've connected database but maybe express app is not able to communicate

       app.listen(process.env.PORT, () => {
          console.log(`App is listening on port ${process.env.PORT}`);
       })
    } 
    catch (error) {
       console.log("ERROR: ", error);
    //    or, console.error("ERROR");
    throw err
    }
} ) ()

*/