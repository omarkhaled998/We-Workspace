const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

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
module.exports = router ; 