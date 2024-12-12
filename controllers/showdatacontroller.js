const jwt = require('jsonwebtoken');
const secretkey = "secretkey";

// Function to verify token and respond with profile data
const accessProfile = (req, resp) => {
    jwt.verify(req.token, secretkey, (err, authData) => {
        if (err) {
            resp.status(403).json({ result: "Invalid token" });
        } else {
            resp.json({
                message: "Profile accessed",
                authData
            });
        }
    });
};

// Example route using the accessProfile function
module.exports=accessProfile;
