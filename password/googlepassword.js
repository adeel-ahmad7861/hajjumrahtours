// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;

// // Serialize user information into session
// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// // Deserialize user from session
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// // Configure Google OAuth Strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,  // Ensure these are in your .env file
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback", // Update this in production
//     passReqToCallback: true
// }, function (request, accessToken, refreshToken, profile, done) {
//     // Optionally store accessToken and refreshToken
//     profile.accessToken = accessToken;
//     profile.refreshToken = refreshToken;

//     return done(null, profile);
// }));

// module.exports = passport;


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GoogleUser = require('../models/googlemodule'); // Import model

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/google/callback",
  passReqToCallback: true,
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    let user = await GoogleUser.findOne({ googleId: profile.id });
    if (!user) {
      user = await GoogleUser.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profilePicture: profile.photos[0]?.value,
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;

