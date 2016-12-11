"use strict";

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);


//helper functions
function findById(id, fn) {
  User.findOne(id).exec(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}
 
function findByEmail(e, fn) {
  User.findOne({
    email: e
  }).exec(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

 
// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function (email, password, done) {

    // asynchronous verification, for effect...
    process.nextTick(function () {

      findByEmail(email, function (err, user) {
        if (err) {
          return done(null, err);
        }

        if (!user) {
          return done(null, false, {
            message: 'Unknown user ' + email
          });
        }

        bcrypt.compare(password, user.password, function (err, res) {
          if (!res) {
            return done(null, false, {
              message: 'Invalid Password'
            });
          }
            
          var returnUser = {
            email: user.email,
            name: user.name,
            id: user.id
          };

          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
      });

    });

  }
));