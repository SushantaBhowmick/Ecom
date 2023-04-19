const mongoose  = require("mongoose");

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter Product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Product price"],
        maxlength:[8,"Price cannot cxceed 8 charaters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    }
    ],
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:[true,"Please enter Product Stock"],
        maxlength:[4,"Stock cannot exceed chareters"],
        default:1,

    },
    numOfReviews:{
            type:Number,
    },
    reviews:[
        {
            name:{
               type: String,
            required:true,
        },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            },
        },
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model("Product",productSchema)
