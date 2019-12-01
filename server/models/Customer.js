const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    SSN : {
        type : String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    }, 
    gender: {
        type: Boolean,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    
    // location info
    
    // email info
    email: {
        type: String, 
        required: true
    },
    
    password: {
        type: String, 
        required: true
    },
    // contact info
    mobileNumber: {
        type: String, 
        required: true
    }

})

module.exports = Customer = mongoose.model('customers', CustomerSchema)