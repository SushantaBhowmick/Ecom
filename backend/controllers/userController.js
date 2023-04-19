const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

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
    sendToken(user,201,res);
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
    sendToken(user,200,res);

})

//Logut User

exports.logoutUser = catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

//forgot Password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    //Get resetPassword token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n
    If you have not requested this email then please ignore it`;

    try {
        
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
     
    await user.save({ validateBeforeSave: false});
        
    return next(new ErrorHandler(error.message,500))
    }
})

//Reset Password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    
})