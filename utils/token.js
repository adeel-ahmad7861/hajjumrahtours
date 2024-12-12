// const jwt = require('jsonwebtoken');
// const secretkey = "secretkey";

// // Async function to generate JWT token
// const generateToken = async (payload) => {
//     try {
//         const token = await new Promise((resolve, reject) => {
//             jwt.sign(payload, secretkey, { expiresIn: '240s' }, (error, token) => {
//                 if (error) {
//                     reject('Token generation failed');
//                 } else {
//                     resolve(token);
//                 }
//             });
//         });
//         return token;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// module.exports = generateToken;
const jwt = require('jsonwebtoken');
const secretkey = "secretkey";

// Async function to generate JWT token
const generateToken = async (payload) => {
    try {
        const token = jwt.sign(payload, secretkey, { expiresIn: '30m' });
        return token;
    } catch (error) {
        throw new Error('Token generation failed: ' + error.message);
    }
};

module.exports = generateToken;



