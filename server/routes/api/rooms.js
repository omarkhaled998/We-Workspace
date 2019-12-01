const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const fetch = require("node-fetch");
const server = require("../../config/config");

const Room = require("../../models/Room");
const Customer = require("../../models/Customer");

const validator = require("../../validations/roomValidations");
//const notificationValidator = require("../../validations/memberValidations");

const ObjectId = require("mongodb").ObjectID;
mongoose.set("useFindAndModify", false);

//CRUDS
router.get("/", async (req, res) => {
    const rooms = await Room.find();
    res.json({ data: rooms });
  });
  
//   router.get("/:id", async (req, res) => {
//     if (ObjectId.isValid(req.params.id)) {
//       const id = req.params.id;
//       const room = await Room.findById(id);
//       if (room) {
//         res.json({ data: room });
//       } else {
//         return res.status(404).send({ error: "No room with this id" });
//       }
//     } else return res.status(404).send({ error: "ID ERROR" });
//   });
  router.post("/", async (req, res) => {
    try {
      const isValidated = validator.createValidationRoom(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      const newRoom = await Room.create(req.body);
      res.json({ msg: "Room was created successfully", data: newRoom });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error");
    }
  });
  router.put("/:id", async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const updatedRoom = await Room.findByIdAndUpdate(
          { _id: req.params.id },
          req.body
        );
        if (!updatedRoom)
          return res.status(404).send({ error: "Room does not exist" });
        res.json({ msg: "Room updated successfully" });
      } else {
        return res.status(404).send({ error: "Not a room id" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "Room does not exist" });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const id = req.params.id;
        const deletedRoom = await Room.findByIdAndRemove(id);
        if (!deletedRoom)
          return res.status(404).send({ error: "Room does not exist" });
        res.json({ msg: "Room was deleted successfully", data: deletedRoom });
      } else {
        return res.status(404).send({ error: "Room does not exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error");
    }
  });
  module.exports = router ; 