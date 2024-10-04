class ErrorHandeler extends Error {
    constructor(message, statuscode) {
        super(message),
        this.statuscode = statuscode
    }
}
export const errormidleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error"
    err.statuscode = err.statuscode || 500
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandeler(message, 400)
    }
    if (err.name === 'JsonWebTokenError') {
        const message = "Json Web Token is Invalid!,Try again!"
        err = new ErrorHandeler(message, 400)
    }
    if (err.name === 'TokenExpireError') {
        const message = "Json Web Token Expired!,Try again!"
        err = new ErrorHandeler(message, 400)
    }
    if (err.name === 'CastError') {
        const message = `Invalid ${err.path}`
        err = new ErrorHandeler(message, 400)
    }
    const errormessage = err.errors ? Object.values(err.errors).map((error) =>  error.message ).join(" ") : err.message
    return res.status(err.statuscode).json({
        success: false,
        message: errormessage
    })
}
export default ErrorHandeler