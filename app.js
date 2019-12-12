const express = require('express');
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');
require('./server/models/Room');

////import routes
const roomsRoute = require('./server/routes/api/rooms');
const customersRoute = require('./server/routes/api/customers');


app.use(bodyParser.json());
app.use(express.json());
app.use('/customer',customersRoute);
app.use('/room',roomsRoute);



// app.use('/room',roomsRoute);

// ///routes 
 app.get('/',(req,res) =>{
 res.send('we are on home');
     
});

const db = require('./server/config/config').MongoUri;

//connect to db
mongoose.connect(db).then(()=>console.log('connected to DB !!')).catch(err => console.log(err));



///listen to the server
app.listen(3000);
