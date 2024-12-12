// const express=require('express');
// const {forgetpassword,resetpassword}=require('../controllers/forgetpasswordcontroller');

// const router = express.Router();

// router.post('/', forgetpassword);

// router.post('/',resetpassword);

// module.exports = router;


const express = require('express');
const { reset_password } = require('../controllers/forgetpasswordcontroller'); // Correct path

const router = express.Router();

// Route for reset password (to actually change the password)
router.post('/', reset_password);

module.exports = router;
