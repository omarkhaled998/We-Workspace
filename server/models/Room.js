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
        default:[[]]

    }

})

module.exports = Room = mongoose.model('rooms', RoomSchema)