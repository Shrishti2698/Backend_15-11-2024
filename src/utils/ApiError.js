class APIError extends Error {
    constructor( // creating our own constructor. 
        statusCode,   // whoever will use this constructor, will provide status code
        message= "Something went Wrong", // This message is never appriciated! that's y written here
        error = [],
        statck = ""  // error statck 
    ){
        super(message)  // "meassage" to be over-ridden
        this.statusCode = statusCode  // overriding statusCode, by my statusCode
        this.data = null // Usually we make it null (read about it) 
        this.message = message // overriding message
        this.success = false // As we're handelling API errors not API response
        this.errors = errors

        // 06:08:40
        if(stack) {
            this.stack = stack        
        } 
        else {
            Error.captureStackTrace(this, this.constructor) // In StackTrace, we've passed the instance, in which context we're talking about
        }
    } // {} in constructor is "overriding" part
}

export {APIError}