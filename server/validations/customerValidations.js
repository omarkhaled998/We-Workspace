const Joi = require('joi')

module.exports = {
    createValidationCustomer: request => {
        const createSchema = {
            //persinal info
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            SSN: Joi.number().required(),
            //birthDate: Joi.date().required(),
            gender: Joi.boolean().required(),
            nationality: Joi.string().min(3).max(100).required().regex(/^([^0-9]*)$/),
           
            //
            email: Joi.string().max(100).required().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).required().regex(/^(?=.*\d).{4,20}$/),
            mobileNumber:Joi.string().required(),
            
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationCustomer: request => {
        const updateSchema = {
            firstName: Joi.string(),
            lastName: Joi.string(),
            SSN:Joi.string(),
            birthDate: Joi.date(),
            gender: Joi.boolean(),
            nationality: Joi.string().min(3).max(100).regex(/^([^0-9]*)$/),
            
            //

            email: Joi.string().max(100).regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).regex(/^(?=.*\d).{4,20}$/),
            mobileNumber:Joi.string(),
            
        }

        return Joi.validate(request, updateSchema)
    }, 
} 