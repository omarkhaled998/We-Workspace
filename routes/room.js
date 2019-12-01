const express = require('express');

const router = express.Router();


router.get('/',(req,res) =>{
    res.send('we are in room');
     
});

module.exports=router;