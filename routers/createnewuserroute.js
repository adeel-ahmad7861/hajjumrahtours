// createnewuser.route.js
const express = require('express');
const verifyToken = require('../middleware/auth');
const { createUser, updateuser, deleteuser } = require('../middleware/newusermiddleware');
const { registerUser, updateUser, deleteUser,verifymail } = require('../controllers/authcontroller'); // Update auth.controller exports
const router = express.Router();

// Register user
router.post('/', createUser, registerUser);

router.get('/',verifymail);

// Update user
router.put('/', verifyToken, updateuser, updateUser);

// Delete user
router.delete('/',verifyToken, deleteuser, deleteUser);

module.exports = router;
