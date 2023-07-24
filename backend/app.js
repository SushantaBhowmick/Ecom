const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const app = express();

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });

}
// parse application/json
app.use(express.json());
app.use("*", cors({
  origin: true,
  credentials: true,
})
)
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json())
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


app.use(errorHandler)




module.exports = app;