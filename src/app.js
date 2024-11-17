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
// Basically, settting limits of the data coming to the backend
app.use(express.json({limit: "16kb"}))  // documentation
app.use(express.urlencoded({extended: true, limit: "16kb"})) // for the data coming from url
// extended - for nested objects (optional)
app.use(express.static("public")) // nothing but a public folder/assets, any one can use(eg: images, files etc)
// Here, "public" is just a name. We can change it!
app.use(cookieParser())



export { app } // our previous way



// whatever a data comes from url, it comes from req.params()