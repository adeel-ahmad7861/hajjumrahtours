const Joi = require('joi');

const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),  // Validate that email is required and is a valid email
    password: Joi.string().min(6).required(), // Validate that password is required and has a minimum length
});

module.exports = loginUserValidation;
