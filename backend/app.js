const  express = require('express');
// const {product} = require('./routes/produRoute');

const errorHandler = require('./middleware/error')
const app =  express();

app.use(express.json());
// app.use(bodyparser)

//Route Imports
const product= require('./routes/produRoute')
app.use('/api/v1',product);


app.use(errorHandler)




module.exports = app;