const express = require('express');

const app=express();
const mongoose = require('mongoose');
require('dotenv/config');
require('./server/models/Room');

////import routes
const roomsRoute = require('./server/routes/api/rooms');
const customersRoute = require('./server/routes/api/customers');



app.use('/customer',customersRoute);
app.use('/room',roomsRoute);



// app.use('/room',roomsRoute);

// ///routes 
 app.get('/',(req,res) =>{
 res.send('we are on home');
     
});


//connect to db
mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser:true},
() => console.log('connected to DB !!'));


///listen to the server
app.listen(3000);