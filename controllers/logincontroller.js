const user_data = require('../models/user.models');
const generateToken = require('../utils/token'); // Import token generator

const loginUser = async (req, res) => {
    try {
        // Fetch user data based on the request (e.g., by email and password)
        let result = await user_data.findOne(req.body);

        if (result) {
            // Generate token if user is found

            // Pass an object as payload for token generation
            const token = await generateToken({ userId: result._id });
            console.log(token)
            res.status(200).json({ message: 'Login successful', token }); 
        } else {
            res.status(404).send('User not found, please register first');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred', error });
    }
};

module.exports = loginUser;
