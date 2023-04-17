const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');

//register a user
exports.registerUser = catchAsyncError( async(req,res,next)=>{
    const {name,email,password} = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"This is a Sample id",
            url:"This is a Sample url",
        }
    });
    const token = user.getJWTToken();
    res.status(201).json({
        success:true,
        token,
    })
})


//loginUser
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has given password and email both or not  
    if(!email || !password){
        return next(new ErrorHandler("Please enter Email & Password",400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email & password",401))
    }
    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email & password",401))
    }
    const token = user.getJWTToken();
    res.status(201).json({
        success:true,
        user,
        token,
    })

})
