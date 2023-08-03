const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const path = require("path");

const app = express();

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
  require('dotenv').config({path:"backend/config/config.env"})
}

// parse application/json
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("*",cors({
  origin:true, 
  credentials:true,
}));
app.use(cookieParser());
app.use(fileUpload());


//Route Imports
const products = require('./routes/prodRoute')
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoutes');

app.use('/api/v1', products);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorHandler)




module.exports = app;