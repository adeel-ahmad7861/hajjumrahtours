const Joi = require('joi');

const submituser = Joi.object({
    Name: Joi.string().required().trim(),
    email: Joi.string().email().required().trim().lowercase(),
    // isEmailVerified: Joi.boolean().default(false),
    phone: Joi.string().required().trim(),
    Destination: Joi.string().required().trim(),
    totalpeople: Joi.number().integer().min(0).default(0),
    leavingdate: Joi.string().required().trim(),
    Message: Joi.string().required().trim(),
});

module.exports = submituser;
