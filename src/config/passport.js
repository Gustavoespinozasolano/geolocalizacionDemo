const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/User'); 

passport.use(new LocalStrategy({
  usernameField: 'celular'
}, async (celular, password, done) => {
  // Match Email's User
  const user = await User.findOne({celular: celular});
  if (!user) {
    return done(null, false, { message: 'Usuario no existe' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Password Incorrecta' });
    }
  }

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
