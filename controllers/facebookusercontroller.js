
// module.exports = {
//     loadAuth: (req, res) => {
//         res.render('home'); // Renders the home view
//     },
//     successFacebookLogin: (req, res) => {
//         res.render('success', { user: req.user }); // Passes the user object to the success view
//     },
//     failureFacebookLogin: (req, res) => {
//         res.send('Facebook login failed'); // Handles failure gracefully
//     },
// };

module.exports = {
    loadAuth: (req, res) => {
        res.render('home');
    },
    successFacebookLogin: (req, res) => {
        res.render('success', { user: req.user });
    },
    failureFacebookLogin: (req, res) => {
        res.send('Facebook login failed');
    },
};
