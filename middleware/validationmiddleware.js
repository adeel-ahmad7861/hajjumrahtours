// middlewares/validationMiddleware.js
const loginUserValidation = require('../validations/loginuser.validation');

const validateLoginUser = (req, res, next) => {
    const { error } = loginUserValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next(); // Ensure this line calls the next middleware correctly
};


module.exports = validateLoginUser;
