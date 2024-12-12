




// const express = require('express');
// const passport = require('../password/facebookpassword1'); // Ensure proper path to password file
// const userController = require('../controllers/facebookusercontroller');

// const router = express.Router();

// // Initialize Passport
// router.use(passport.initialize());
// router.use(passport.session()); // Required for session handling

// // Home Route
// router.get('/', userController.loadAuth);

// // Facebook Authentication Route
// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

// // Facebook Callback Route
// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/success',
//         failureRedirect: '/failure',
//     })
// );

// // Success and Failure Routes
// router.get('/success', userController.successFacebookLogin);
// router.get('/failure', userController.failureFacebookLogin);

// module.exports = router;


const express = require('express');
const passport = require('../password/facebookpassword1');
const userController = require('../controllers/facebookusercontroller');

const router = express.Router();

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session()); // Required for session handling

// Home Route
router.get('/', userController.loadAuth);

// Facebook Authentication Route
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

// Facebook Callback Route
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/facebook/success',
        failureRedirect: '/facebook/failure',
    })
);

// Success and Failure Routes
router.get('/success', userController.successFacebookLogin);
router.get('/failure', userController.failureFacebookLogin);

module.exports = router;
