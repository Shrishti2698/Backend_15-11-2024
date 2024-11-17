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
    if(!this.isModified("password")) return next(); // checking if password is not modified, then hato yaha se..
           
    this.password = bcrypt.hash(this.password, 10)   // if modified, then make these changes and go to next()
   next()  // take password field. Encrypt it and save it
})  // mongoose documentation-> middleware (hooks)
// using pre hook - changes, just before "saving" the data
// async - 'coz it takes time
// next - to pass this flag forward. 
// function() - is a callback

// becryt - to encrypt
// hash(this.password) ko hash kardo!
// 10 is a hashround

// HERE IS A PROBLEM:- EVERYTIME USER CHANGES SOMETHING (SAT, AVATAR, PHOTO ETC) THE PASSWORD WILL ALSO CHANGE AS IT'S A PRE HOOK
// pre hook has access of password
// Instead we want, when we want to modify password field then only it gets changed!
// we don't want password to be encrypted everytime

userSchema.methods.isPasswordCorrect = async function(password){  // mongoose documentation-> methods. Checking if the database password matches w the users password or not
   return await bcrypt.compare(password, this.password) // logic how password is checked
   // compare - returns true or false
}


export const User = mongoose.model('User', userSchema)