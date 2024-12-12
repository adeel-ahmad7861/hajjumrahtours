// routes/userlogin.route.js

const express = require('express');
const validateLoginUser = require('../middleware/validationmiddleware');
const verifyToken = require('../middleware/auth');
const loginUser = require('../controllers/logincontroller');
const showData = require('../controllers/showdatacontroller');

const router = express.Router();

// Login route with validation
router.post('/', validateLoginUser, loginUser);

// Profile route with token verification
router.get('/', verifyToken, showData);

module.exports = router;
