// newusermiddleware.js
const { Createuser, Updateuser, Deleteuser } = require('../validations/newuservalidation');

const createUser = (req, res, next) => {
    const { error } = Createuser.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const updateuser = (req, res, next) => {
    const { error } = Updateuser.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const deleteuser = (req, res, next) => {
    const { error } = Deleteuser.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = { createUser, updateuser, deleteuser };
