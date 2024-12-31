import {asyncHandler} from "../utils/asyncHandler.js";// asyncHandler is a Helper function and a heigher order function


const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({  // we've sent json response
        message: "ok"
    })
} )

// we've created method but it should be called after hitting of some url (routes)



export {registerUser}