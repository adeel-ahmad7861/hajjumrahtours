// const express = require('express');
// const userController = require('../controllers/googleusercontroller');
// const passport = require('../password/googlepassword');

// const router = express.Router();

// router.use(passport.initialize());
// router.use(passport.session());
// console.log()
// // Home view route
// router.get('/', userController.loadAuth);

// // Google Authentication route
// router.get('/auth/google', passport.authenticate('google', {
//     scope: ['email', 'profile']
// }));

// // Google callback route
// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/success',
//         failureRedirect: '/failure'
//     })
// );

// // Success and failure routes
// router.get('/success', userController.successGoogleLogin);
// router.get('/failure', userController.failureGoogleLogin);

// module.exports = router;


const express = require('express');
const userController = require('../controllers/googleusercontroller');
const passport = require('../password/googlepassword');

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/', userController.loadAuth);

router.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.SUCCESS_URL || '/success',
    failureRedirect: process.env.FAILURE_URL || '/failure',
  })
);

router.get('/success', userController.successGoogleLogin);
router.get('/failure', userController.failureGoogleLogin);

module.exports = router;
