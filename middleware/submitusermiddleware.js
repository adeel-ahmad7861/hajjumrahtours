// newusermiddleware.js
const submituser= require('../validations/submitvalidation');

const SubmituUer = (req, res, next) => {
    const { error } = submituser.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
module.exports =SubmituUer;
