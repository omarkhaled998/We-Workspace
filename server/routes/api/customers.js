const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
//const ObjectId = require("mongodb").ObjectID;
const fetch = require("node-fetch");
const server = require("../../config/config");

const Room = require("../../models/Room");
const Customer = require("../../models/Customer");

const validator = require("../../validations/customerValidations");
//const notificationValidator = require("../../validations/memberValidations");

const ObjectId = require("mongodb").ObjectID;
mongoose.set("useFindAndModify", false);

//CRUDS
router.get("/", async (req, res) => {
    const customers = await Customer.find();
    res.json({ data: customers });
  });
  
  router.get("/:id", async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const customer = await Customer.findById(id);
      if (customer) {
        res.json({ data: customer });
      } else {
        return res.status(404).send({ error: "No customer with this id" });
      }
    } else return res.status(404).send({ error: "ID ERROR" });
  });
  router.post("/", async (req, res) => {
    try {
      const isValidated = validator.createValidationCustomer(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      
          const newCustomer = await Customer.create(req.body);
      res.json({ msg: "customer was created successfully", data: newCustomer });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error");
    }
  });









  router.put("/:id", async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const updatedCustomer = await Customer.findByIdAndUpdate(
          { _id: req.params.id },
          req.body
        );
        if (!updatedCustomer)
          return res.status(404).send({ error: "customer does not exist" });
        res.json({ msg: "customer updated successfully" });
      } else {
        return res.status(404).send({ error: "Not a customer id" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "customer does not exist" });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const id = req.params.id;
        const deletedCustomer = await Customer.findByIdAndRemove(id);
        if (!deletedCustomer)
          return res.status(404).send({ error: "customer does not exist" });
        res.json({ msg: "customer was deleted successfully", data: deletedCustomer });
      } else {
        return res.status(404).send({ error: "customer does not exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error");
    }
  });


// as a customer i want to view all rooms

router.get("/allRooms", async (req, res) => {

  
  await fetch(`${server}/api/rooms`)
    .then(res => res.json())
    .then(json => {
      const rooms = json.data;
      res.json({ data: rooms });
    })
    .catch(err => console.log("Error", err));

});


//as a customer i want to reserve a room
router.get("/roomreserve/:id",async (req, res)=>{
  const roomId = req.params.id;
  var flag = false ;
  var c = 0;
  const startDate = new Date('2019-12-17T03:24:00');
  const endDate = new Date('2019-12-17T05:24:00');
  if(ObjectId.isValid(roomId)){
    const room = await Room.findById(roomId);
    if(room){

      for( i=0 ; i<room.reservations.length && (flag == false) ; i++){
      //   if((startDate.getDay() === room.reservations[i][0].getDay() && startDate.getFullYear() === room.reservations[i][0].getFullYear() && startDate.getHours() >=  ) )

      // }
        console.log(room.reservations[i][0]);
      if( ( (startDate.getTime()>= room.reservations[i][0].getTime()) && (startDate.getTime()<= room.reservations[i][1]).getTime() ) || ( (endDate.getTime()>= room.reservations[i][0].getTime()) && (endDate.getTime()<= room.reservations[i][1]).getTime() )  )
        flag = true;
      c = i;  


    }
    if(flag == false){
    //  console.log(c);
      //console.log(room);
      room.reservations[c][0].push(startDate);
      room.reservations[c][1].push(endDate);
      //console.log(room);
      res.json({ data: room });
    }
    else
      console.log("already reserved");

  }

}});

module.exports = router ; 

