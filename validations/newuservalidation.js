// newuservalidation.js
const Joi = require('joi');

const Createuser = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    timezone: Joi.string().required(),
    phone: Joi.string().required(),
    
    
});

const Updateuser = Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    timezone: Joi.string().optional(),
    phone: Joi.string().optional(),
});

const Deleteuser = Joi.object({
    
    id: Joi.string().required().messages()
});


module.exports = { Createuser, Updateuser, Deleteuser };
