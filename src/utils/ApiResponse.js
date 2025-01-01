class ApiResponse {
    constructor(statusCode, data, message = "Success"){ // As its API response, message will be "Success"
       this.statusCode = statusCode
       this.data = data
       this.message = message
       this.success = statusCode < 400 // search, surver status code; not a hard n fast rule but we've set it for outselves only
    }
}

export { ApiResponse }