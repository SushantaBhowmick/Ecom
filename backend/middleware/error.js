const ErrorHandler = require("../utils/errorHandler");



module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Servaer Error";

    //wrong Mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid:${err.path}`
        err = new ErrorHandler(message,400);
    }

    //mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);

    }
    //json web token  error
    if(err.name === "jsonWebTokenError"){
        const message = `Json Web Token is Invalid, Try agian`
        err = new ErrorHandler(message,400);

    }
    //json web token  error
    if(err.name === "TokenExpiresError"){
        const message = `Json Web Token is Expires, Try agian`
        err = new ErrorHandler(message,400);

    }


    res.status(err.statusCode).json({
        success:false,
        message:err.stack,
    })
}