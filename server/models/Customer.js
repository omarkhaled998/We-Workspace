const mongoose = require('mongoose')

// Create the schema
const CustomerSchema = mongoose.Schema({
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
        required: false
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

module.exports = mongoose.model('Customers', CustomerSchema)