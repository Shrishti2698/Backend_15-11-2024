class ApiResponse {
    constructor(statusCode, data, message = "Success"){ // As its API response, message will be "Success"
       this.statusCode = statusCode
       this.data = data
       this.message = message
       this.success = statusCode < 400 // search, surver status code
    }
}