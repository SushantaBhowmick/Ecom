const app = require("./app");
const dotenv = require('dotenv');
const connectDB = require("./config/database");

// Handled Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);

})
//config
dotenv.config({path:"backend/config/config.env"})

connectDB();


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