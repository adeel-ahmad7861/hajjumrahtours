// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const User = require('../models/facebookmodule'); // Adjust path as needed

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "/auth/facebook/callback",
//     profileFields: ['id', 'displayName', 'emails']
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         // Check if user exists in the database
//         let user = await User.findOne({ facebookId: profile.id });
//         if (!user) {
//             // Create a new user if not found
//             user = await User.create({
//                 facebookId: profile.id,
//                 name: profile.displayName,
//                 email: profile.emails?.[0]?.value || '', // Ensure email is optional
//             });
//         }
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// });

// module.exports = passport;


const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/facebookmodule'); // Adjust path as needed

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
    throw new Error('Missing Facebook App credentials in .env');
}

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/facebook/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails', 'photos']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
            user = await User.create({
                facebookId: profile.id,
                name: profile.displayName,
                email: profile.emails && profile.emails[0]?.value || '',
                profilePicture: profile.photos && profile.photos[0]?.value || ''
            });
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
