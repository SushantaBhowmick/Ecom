const app = require("./app");
const cloudinary =require('cloudinary');
const connectDB = require("./config/database");

// Handled Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);

})
//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"})
}

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// /unhandled Promise rejection

process.on("unhandledRejection",err=>{
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promises Rejection`);
    
    server.close(()=>{
        process.exit(1);
    })
})