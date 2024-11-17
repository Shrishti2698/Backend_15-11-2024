import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtocken"
import bcrypt from "bcrypt"  // Both their direct encryption is not possible. So go to "mongoose" documentation -> Hooks 

const userSchema = new Schema(  // refer hc's Eraser.io (link:- hc's Github -> Model Link)
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true // If we want to make a field searchable in database, then make it's index true (just for optimization)
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        }, 
        avatar: {
            type: String, // cloudnary url
            required: true,
        },
        coverImage: {
            type: String,  // cloudnary url
            
        },
        watchHistory: [  // this will make it too COMPLEX
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String, // String - a trick here. For encryption purpose
            required: [true, "Password is required"]
        },
        refershtocken: {
            type: String,
        }
    },
    { timestamps: true }
)


userSchema.pre("save", async function (next) {
   this.password = bcrypt.hash(this.password, 10) 
   next()  // take password field. encrypt it and save it
})  // mongoose documentation-> middleware (hooks)
// using pre hook just before "saving" the data
// async - 'coz it takes time
// next - to pass this flag forward. 
// function() - is a callback

// becryt - to encrypt
// hash(this.password) ko hash kardo!
// 10 is a hashround

export const User = mongoose.model('User', userSchema)