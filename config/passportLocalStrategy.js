'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id: id }, function(err, user) {
    done(err, user);
  });
});

var verifyHandler = function(req, username, password, cb) {
  process.nextTick(function() {
    User.findOne({ username: username }, function(err, user) {
      if (err) return cb(err);
      if (!user) return cb(null, false, 'Username not found');
      bcrypt.compare(password, user.password, function(err, res) {
        if (res === false) return cb(null, false, 'Invalid Password');
        req.logIn(user, function(err) {
          if (err) {
            return cb(null, false, err)
          }
          return cb(null, user, 'Login Succesful');
        })
      });
    });
  });
};

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true

}, verifyHandler));

// passport.use(new LocalStrategy({
//   usernameField: 'username',
//   passportField: 'password',
//   passReqToCallback: true
// }, function(username, password, cb){
//   User.findOne({username: username}, function(err, user){
//     if(err) return cb(err);
//     if(!user) return cb(null, false, {message: 'Username not found'});
//     bcrypt.compare(password, user.password, function(err, res){
//       if(!res) return cb(null, false, { message: 'Invalid Password' });
//       let userDetails = {
//         username: user.username,
//         id: user.id
//       };
//       return cb(null, userDetails, { message: 'Login Succesful'});
//     });
//   });
// }));
