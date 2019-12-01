const Joi = require('joi')

module.exports = {
    createValidationRoom: request => {
        const createSchema = {
            //persinal info
            capacity: Joi.number().required(),
            roomNumber: Joi.number().required(),
            
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationRoom: request => {
        const updateSchema = {
            firstName: Joi.number(),
            lastName: Joi.number(),
           
        }

        return Joi.validate(request, updateSchema)
    }, 
}