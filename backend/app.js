const  express = require('express');
// const {product} = require('./routes/produRoute');

const errorHandler = require('./middleware/error')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const app =  express();

// parse application/json
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());


//Route Imports
const products= require('./routes/prodRoute')
const user= require('./routes/userRoutes');
const order= require('./routes/orderRoute');
app.use('/api/v1',products);
app.use('/api/v1',user);
app.use('/api/v1',order);


app.use(errorHandler)




module.exports = app;