// createnewuser.route.js
const express = require('express');
const SubmitUser = require('../middleware/submitusermiddleware');
const submituser  = require('../controllers/submitcontroller'); // Update auth.controller exports
const router = express.Router();

// Register user
router.post('/', SubmitUser, submituser);


module.exports = router;
