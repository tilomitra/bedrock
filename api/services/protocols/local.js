var validator = require('validator');
var crypto = require('crypto');

/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * Register a new user
 *
 * This method creates a new user from a specified email, username and password
 * and assign the newly created user a local Passport.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.register = function(req, res, next) {
    var email = req.param('email');
    var username = req.param('username');
    var password = req.param('password');

    Users.create(req.body, function(err, user) {
        if (err) {
            return next(err);
        }

        // Generating accessToken for API authentication
        var token = crypto.randomBytes(48).toString('base64');

        Passport.create({
            protocol: 'local',
            password: req.body.password,
            UserId: user.id,
            accessToken: token
        }, function(err, passport) {
            if (err) {
                if (err.code === 'E_VALIDATION') {
                    req.flash('error', 'Password is not formatted correctly. It must be at least 8 characters.');
                }

                return user.destroy(function(destroyErr) {
                    next(destroyErr || err);
                });
            }

            user.passports = passport;

            next(null, user);
        });
    });
};

/**
 * Assign local Passport to user
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.connect = function(req, res, next) {
    var user = req.user;
    var password = req.param('password');

    Passport.findOne({
        protocol: 'local',
        user: user.id
    }, function(err, passport) {
        if (err) {
            return next(err);
        }

        if (!passport) {
            Passport.create({
                protocol: 'local',
                password: password,
                user: user.id
            }, function(err, passport) {
                next(err, user);
            });
        } else {
            next(null, user);
        }
    });
};

/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {string}   password
 * @param {Function} next
 */
exports.login = function(req, identifier, password, next) {
    var isEmail = validator.isEmail(identifier),
        query = {};

    if (isEmail) {
        query.email = identifier;
    } else {
        query.username = identifier;
    }

    Users.findOne(query)
        .exec(function(err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                if (isEmail) {
                    req.flash('error', 'That email does not match a record in our system');
                } else {
                    req.flash('error', 'That user does not match a record in our system');
                }

                return next(null, false);
            }

            Passport.findOne({
                protocol: 'local',
                UserId: user.id
            }, function(err, passport) {
                if (passport) {
                    passport.validatePassword(password, function(err, res) {
                        if (err) {
                            return next(err);
                        }

                        if (!res) {
                            req.flash('error', 'Email or password is incorrect');
                            return next(null, false);
                        } else {
                            return next(null, user);
                        }
                    });
                } else {
                    req.flash('error', 'Permanent failure with user record');
                    return next(null, false);
                }
            });
        });
};