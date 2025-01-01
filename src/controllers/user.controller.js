import {asyncHandler} from "../utils/asyncHandler.js";// asyncHandler is a Helper function and a heigher order function
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js"; // this "User"  is from user.models.js (this will call mongoDb on our behalf as many time as we want)
import {uploadOncloudinary} from "../utils/Clodinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";

// const registerUser = asyncHandler(async (req, res) => {
//     res.status(200).json({  // we've sent json response
//         message: "ok"
//     })
// } )

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // uplaod them to cloudinary, avatar  (in return we'll get url then we'll console log it ki kaisa mil ra h url) (user gave multar but ckeck if it is successfully uploaded in cloudinary or not)
    // create user object - create entry in db (.create)
    // remove password and refresh token field and response
    // check for user creation
    // return response; if not then send error(for above)
    
    const {fullName, email, username, password} = req.body // these parameters will be given by us in body
    // we can only handle data here not  file
    console.log("eamil: ", email);

    // if(fullName === "") {
    //     throw new ApiError(400, "fullName is required")
    // }

    if(
        [fullName, email, username, password].some((field) => 
          field?.trim() === "")  // to check empty or not
        ){
            // even if atleast one field returned true that means that field was empty
            throw new ApiError(400, "All fields are required")   // VALIDATION done
        }

       const existedUser =  User.findOne({
            $or: [{ username }, { email }]  // 9:05:54
        }) // find or findOne

        // if user is existed then we're not supposed to proceed but throw an error there only
        if(existedUser) {
            throw new ApiError(409, "User with email or username already exist");  // this is y ApiError is a helper file
        }

        // now we want to check images and avatar images
        const avatarLocalPath = req.files?.avatar[0]?.path   // avatar same as user.routes.js's "avatar"
        // [0].path means jo bhi path multer has uploaded, uski 1st property se hume mil jyega path
        console.log(req.body);

        const coverImageLocalPath = req.files?.coverImage[0]?.path

        // check krna hoga aya h ya nhi
        if(!avatarLocalPath) {
            throw new ApiError(400, "avatar file is required")
        }

        // now we'll upload both the files(above) in Cloudinary
        const avatar = await uploadOncloudinary(avatarLocalPath) // takes time to upload
        const coverImage = await uploadOncloudinary(coverImageLocalPath)

        // again checking avatar is uploaded or not as it is required field. And if not uploaded then DB will crash !!
        if(!avatar) {
            throw new ApiError(400, "Avatar file is required")
        }

        // if everthing's done (above) the create an object and enter that in DB
        // User is the only thing here which is communicating w DB
        const user =  await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",  // but we haven't check for coverImage (above) (as it wasn't required)
            // coverImage?.url || "" means, if coverImage exists then nikal lo otherwise let it be empty
            password,
            username: username.toLowerCase()
        })

  // mongoDb har ek entry k sath (above, inside User.create) ek _id name ka field add kar deta h
        
        const createdUser = await User.findById(user._id).select(  // findById is a method where we can pass Id
          // if we got user by findById, then we can pass the fields in .select which we don't wanna select (bydefault evrything's selected)
          "-password -refreshTocken"   // refer user.models.js   // minus - to exclude
        )

          // checking user has come or not
          if(!createdUser) {
            throw new ApiError(500, "Something went wrong while registering a user")
          }

          // if user is properly created then send response
          return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully")  // coming from ApiREsponse.js
            // 9:27:40
          )
    
} )

// we've created method but it should be called after hitting of some url (routes)



export {registerUser}