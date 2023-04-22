const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../models/prodModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

//create Product --Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: "Product Created Successfully!",
        product
    })
}
)


//get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resutlPerPage = 5;
    const productCount = await Product.countDocuments()
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resutlPerPage);
    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount
    })
}
)

//Update Products --addmin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })

    res.status(200).json({
        success: true,
        message: "Products updated Successfully!",
        product
    })
}
)
//delete product 
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const deleteProduct = await Product.findById(req.params.id);

    if (!deleteProduct) {
        return next(new ErrorHandler("Product not found", 404))
    }
    await Product.findByIdAndDelete(deleteProduct)

    res.status(200).json({
        success: true,
        message: "Products Deleted Successfully!",

    })
}
)

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        message: "User Get successfully!",
        product
    })
}
)

//create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviwed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviwed) {
        product.reviews.forEach((rev) => {
            if (rev => rev.user.toString() === req.user._id.toString())
                (rev.rating), (rev.comment = comment)
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })

})


//Get all reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
      }
    
      res.status(200).json({
        success: true,
        reviews: product.reviews,
      });
})

//Delete Review
exports.deleteProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    )

    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating
    })
    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })


    res.status(200).json({
        success: true,
    })
})