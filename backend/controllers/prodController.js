const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../models/prodModel');
const ErrorHandler = require('../utils/errorHandler');

//create Product --Admin
exports.createProduct = catchAsyncError(
    async(req,res,next)=>{
        const product = await Product.create(req.body);
    
        res.status(201).json({
            success:true,
            message:"Product Created Successfully!",
            product
        })
    }
)


//get all products
exports.getAllProducts =catchAsyncError(
    async(req,res,next)=>{
        const products = await Product.find();
    
        res.status(200).json({
            success:true,
            message:"Products Get Successfully!",
            products
        })
    }
)

//Update Products --addmin
exports.updateProduct = catchAsyncError(
    async(req,res,next)=>{
        let product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true,
            useFindAndModify:true,
        })
    
        res.status(200).json({
            success:true,
            message:"Products updated Successfully!",
            product
        })
    }
)
//delete product 
exports.deleteProduct = catchAsyncError(
    async(req,res,next)=>{

        const deleteProduct = await Product.findById(req.params.id);
    
        if(!deleteProduct){
            return next(new ErrorHandler("Product not found",404))
        }
      await Product.findByIdAndDelete(deleteProduct)
    
        res.status(200).json({
            success:true,
            message:"Products Deleted Successfully!",
    
        })
    }
)

exports.getProductDetails= catchAsyncError(
    async(req,res,next)=>{
        const product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }
        res.status(200).json({
            success:true,
            message:"User Get successfully!",
            product
        })
    }
)
