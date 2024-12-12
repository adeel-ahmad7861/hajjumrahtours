// // models/googlemodule.js
// const mongoose = require('mongoose');

// const googleUserSchema = new mongoose.Schema({
//     googleId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     firstName: String,
//     lastName: String,
//     profilePicture: String
// });

// module.exports = mongoose.model('GoogleUser', googleUserSchema);


const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  profilePicture: String,
});

module.exports = mongoose.model('GoogleUser', googleUserSchema);
