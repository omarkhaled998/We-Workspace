const Joi = require('joi')

module.exports = {
    createValidationRoom: request => {
        const createSchema = {
            //persinal info
            capacity: Joi.number().required(),
            roomNumber: Joi.number().required(),
            reservations: Joi.array()
            
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationRoom: request => {
        const updateSchema = {
            firstName: Joi.number(),
            lastName: Joi.number(),
            reservations: Joi.array(),
        }

        return Joi.validate(request, updateSchema)
    }, 
}