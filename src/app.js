// go to "express" documentation
import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'  // to perform CRUD operation in user's browser. Only server can use and delete it. "SECURED"


const app = express()

app.use(cors({  // after importing, now we have to configure also
    origin: process.env.CORS_ORIGIN,
    credentials: true // to allow credientials
}))

// Below, we have to do some settings as data will be coming to backend from many sources - JSON format mei ayega, some req will be in body, through direct form, files etc
// We need to install 3rd party package to recieve data from as "file" --> Multer
// Basically, setting limits of the data coming to the backend
app.use(express.json({limit: "16kb"}))  // documentation
// above- its telling that we're accepting json format data of this limit(we dont want server to be crashed)
app.use(express.urlencoded({extended: true, limit: "16kb"})) // for the data coming from url
// extended - for nested objects (optional)
app.use(express.static("public")) // nothing but a public folder/assets, any one can use(eg: images, files etc)
// Here, "public" is just a name. We can change it!
app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js";


// routes declaration
// ab "app.get()" se kaam ni bnega, as everything's is in different folder now. 
// Now we have to use Middleware "app.use"
app.use("/api/v1/users", userRouter)     // after "/api/v1/users", userRouter will be activated
// this is how the control will be passed to userRouter and there, will perform task
// "/users" will be treated as prefix. URL will be created as -
// http://localhost:8000/api/v1/users/register we'll write, erite it in user.routes.js




export { app } // our previous way



// whatever a data comes from url, it comes from req.params()