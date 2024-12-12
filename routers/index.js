
// const express = require('express');
// const submituserRoute = require('./submituserroute');
// const createnewuserRoute = require('./createnewuserroute');
// const userRoute = require('./userlogin.route');
// const changepasswordRoute= require('./forget-passwordroute');
// const resetpasswordRoute= require('./reset-password-route');
// const facebookloginRoute=require('./facebookrouter');
// const googleloginRoute=require('./googlerouter');
// const docsRoute = require('./docs.route');
// const config = require('../config/config');


// const router = express.Router();

// const defaultRoutes = [
//   { path: '/Submit', route: submituserRoute },
//   { path: '/login', route: userRoute },
//   { path: '/token', route: userRoute },
//   { path: '/register', route: createnewuserRoute },
//   { path: '/verify', route: createnewuserRoute },
//   { path: '/updateuser', route: createnewuserRoute },
//   { path: '/deleteuser', route: createnewuserRoute },
//   { path: '/forgetpassword', route: changepasswordRoute },
//   { path: '/resetpassword', route: resetpasswordRoute },
//   { path: '/facebook', route: facebookloginRoute },
//   { path: '/google', route: googleloginRoute },
// ];

// const devRoutes = [
//   { path: '/docs', route: docsRoute },
// ];

// defaultRoutes.forEach(({ path, route }) => {
//   router.use(path, route);
// });

// if (config.env === 'development') {
//   devRoutes.forEach(({ path, route }) => {
//     router.use(path, route);
//   });
// }

// module.exports = router;


const express = require('express');
const submituserRoute = require('./submituserroute');
const createnewuserRoute = require('./createnewuserroute');
const userRoute = require('./userlogin.route');
const changepasswordRoute = require('./forget-passwordroute');
const resetpasswordRoute = require('./reset-password-route');
const facebookloginRoute = require('./facebookrouter');
const googleloginRoute = require('./googlerouter');
const docsRoute = require('./docs.route');
const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
  { path: '/Submit', route: submituserRoute },
  { path: '/login', route: userRoute },
  { path: '/token', route: userRoute },
  { path: '/register', route: createnewuserRoute },
  { path: '/verify', route: createnewuserRoute },
  { path: '/updateuser', route: createnewuserRoute },
  { path: '/deleteuser', route: createnewuserRoute },
  { path: '/forgetpassword', route: changepasswordRoute },
  { path: '/resetpassword', route: resetpasswordRoute },
  { path: '/facebook', route: facebookloginRoute },
  { path: '/google', route: googleloginRoute },
];

const devRoutes = [
  { path: '/docs', route: docsRoute },
];

defaultRoutes.forEach(({ path, route }) => {
  // console.log(`Loading route: ${path}`); // Debugging log
  router.use(path, route);
});

if (config.env === 'development') {
  devRoutes.forEach(({ path, route }) => {
    router.use(path, route);
  });
}

module.exports = router;
