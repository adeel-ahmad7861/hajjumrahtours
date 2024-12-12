// auth.controller.js
const submituser_data = require('../models/submitusermodels');

const submitUser = async (req, res) => {
    try {
        const newUser = new submituser_data(req.body);
        const result = await newUser.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}

module.exports = submitUser ;
