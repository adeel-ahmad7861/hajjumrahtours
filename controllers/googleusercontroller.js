
// module.exports = {
//     loadAuth: (req, res) => {
//         res.render('home'); // Renders the home view
//     },
//     successGoogleLogin: (req, res) => {
//         res.render('success', { user: req.user }); // Pass user data to success view
//     },
//     failureGoogleLogin: (req, res) => {
//         res.send('Google authentication failed.');
//     }
// };


module.exports = {
    loadAuth: (req, res) => {
      res.render('home'); // Renders the home view
    },
    successGoogleLogin: (req, res) => {
      if (!req.user) {
        return res.status(401).send('Unauthorized: User not authenticated.');
      }
      res.render('success', { user: req.user }); // Pass user data to success view
    },
    failureGoogleLogin: (req, res) => {
      res.send('Google authentication failed.');
    },
  };
  