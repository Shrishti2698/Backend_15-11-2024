// COMMON FUNCTION  (GENERALIZED FUNCTION) -> SO THAT WE CAN REUSE IT
// It will be just having a method and export it whenever needed


// APPROACH 2

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err)) 
    }
}

export {asyncHandler}




// APPROACH 1 - PROMISES

// const asyncHandler = () => () => {} 
// const asyncHandler = (fun) => () => {} // HoF - fuctions, which can accept function as a parameter or can return them. Treated as variable
// const asyncHandler = (fun) => async () => {}


/*
const asyncHandler = (fun) => async (req, res, next) => {  // HoF function
    // STARTING wrapper (try catch)
    try{
        await fun(req, res, next)
    } 
    catch (error) {
        res.status(err.code || 500).json({   // when user is passing the error otherwise pass 500
        success: false, // "success" flag so that it would be easier for frontend devs
        message: err.message
       }) 
    }
}
  */  