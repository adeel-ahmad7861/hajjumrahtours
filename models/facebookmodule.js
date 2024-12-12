// const mongoose = require('mongoose');

// const facebookUserSchema = new mongoose.Schema({
//     facebookId: {
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
//     profilePicture: String
// });

// module.exports = mongoose.model('FacebookUser', facebookUserSchema);

const mongoose = require('mongoose');

const facebookUserSchema = new mongoose.Schema({
    facebookId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    profilePicture: String,
});

module.exports = mongoose.model('FacebookUser', facebookUserSchema);
