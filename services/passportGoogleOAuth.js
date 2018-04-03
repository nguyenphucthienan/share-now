const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const config = require('../config');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const googleOptions = {
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret,
  callbackURL: '/api/login/google/callback',
  proxy: true
};

const googleLogin = new GoogleStrategy(
  googleOptions,
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      displayName: profile.displayName
    }).save();

    return done(null, user);
  }
);

passport.use(googleLogin);
