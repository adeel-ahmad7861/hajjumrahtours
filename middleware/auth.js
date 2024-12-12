// // middlewares/auth.js

// const jwt = require('jsonwebtoken');
// const secretKey = "secretkey";

// const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== 'undefined') {
//         const token = bearerHeader.split(' ')[1];
//         req.token = token;
//         jwt.verify(token, secretKey, (err, authData) => {
//             if (err) {
//                 res.status(403).json({ result: "Invalid token" });
//             } else {
//                 // req.authData = authData;
//                 res.status(403).json({ result: "token verify" });
//                 next();
//             }
//         });
//     } else {
//         res.status(403).json({ result: "Token not provided" });
//     }
// };

// module.exports = verifyToken;
// middlewares/auth.js
const jwt = require('jsonwebtoken');
const secretKey = "secretkey";

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers && req.headers['authorization']; // Ensuring req.headers is defined
    if (!bearerHeader) {
        return res.status(403).json({ result: "Token not provided" });
    }

    const token = bearerHeader.split(' ')[1];
    req.token = token;

    jwt.verify(token, secretKey, (err, authData) => {
        if (err) {
            return res.status(403).json({ result: "Invalid token" });
        } else {
            req.authData = authData; // You can keep this if you need authData later
            
            next();
             // Call next only if token is valid
        }
    });
};

module.exports = verifyToken;
