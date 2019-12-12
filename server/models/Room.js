const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const RoomSchema = new Schema({
    capacity: {
        type: Number,
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    reservations: {
        type : Array,
        required: false,
        default:[[new Date('2017-11-11T03:24:00'),new Date('2017-11-11T05:24:00')]]

    }

})

module.exports = Room = mongoose.model('rooms', RoomSchema)