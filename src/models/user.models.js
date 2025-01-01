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
            required: [true, "Password is required"] // we can write "Password is required" with "true"
        },
        refershtocken: {
            type: String,
        }
    },
    { timestamps: true }
)


userSchema.pre("save", async function (next) { // direct encryption isn't possible. We need some hooks (eg- pre hook)
    if(!this.isModified("password")) return next(); // checking if password is not modified, then hato yaha se.. Only runs when the password has been modified, not everytime!  
    // aboveline- sara password feild lo, encrypt karke save kardo.    
    // next()- we then have to call next after the work has been done, i.e, our work is done now, pass the call to "next"   
    this.password = await bcrypt.hash(this.password, 10)   // if modified, then make these changes and go to next()
    // this.password - this is what we want to hash
   next()  // take password field. Encrypt it and save it
})  // mongoose documentation-> middleware (hooks)
// using pre hook - changes, just before "saving" the data
// async - 'coz it takes time
// next - to pass this flag forward. 
// function() - is a callback

// becryt - to encrypt
// hash(this.password) ko hash kardo!
// 10 is a hashround. Itne rounds lagao, to save password!

// HERE IS A PROBLEM:- EVERYTIME USER CHANGES SOMETHING (SAT, AVATAR, PHOTO ETC) THE PASSWORD WILL ALSO CHANGE AS IT'S A PRE HOOK - that's y we've used if()
// pre hook has access of password
// Instead we want, when we want to modify password field then only it gets changed!
// we don't want password to be encrypted everytime

 
// 6:52:00
userSchema.methods.isPasswordCorrect = async function(password){  // mongoose documentation-> methods. (an object) Checking if the database password matches w the users password or not
   return await bcrypt.compare(password, this.password) // logic how password is checked
   // compare - returns true or false
   // becrypt can hash awa check if the passwoed is correct or not
}

// Both, .methods and pre has access of the password (which is in the database)

userSchema.methods.generateAccessToken = function(){
   return jwt.sign( // this is how token is generated
        {
            _id: this._id, // _id, we'll get from mongodb
            email: this.email,
            username: this.username,
            fullName: this.fullName, 
            // all these are payload
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){  // refresh token has comparitively less info than access token
    return jwt.sign( // this is how token is generated
        {
            _id: this._id, // _id, we'll get from mongodb 
            // all these are payload
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
// both are JWT tokens- only usage difference!

export const User = mongoose.model('User', userSchema)  // this "User" can directly contact database 'coz it is created by mongoose (and we'll use this at many places)