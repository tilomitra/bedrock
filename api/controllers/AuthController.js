/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var uuid = require('uuid');

var generateResetToken = function (id, callback) {
    var userId = id;
    callback = callback || function () {};
    var token = uuid.v1();
    var expires = new Date(Date.now() + 3600000);

    sails.models.users.findOne({id: userId}).exec(function (err, user) {
        if (!user) {
            callback(err);
        } else {
            sails.models.passport.update(
                {UserId: userId, Protocol: 'local'},
                {resetPasswordToken: token, resetPasswordExpires: expires }
            ).exec(function (err, results) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, results);
                }
            });
        }
    });
};

var AuthController = {

    forgotPassword: function (req, res, next) {
        res.view('pages/forgot');
    },
    forgotPasswordSubmit: function (req, res, next) {
        var email = req.body.email;
        sails.models.users.findOne({email: email})
            .exec(function(err, user) {
                var token = uuid.v1();
                var expires = new Date(Date.now() + 3600000); // 1 hour
                if (err) return next(err);
                if (!user) {
                    req.flash('error', 'No user with email address ' + email);
                    res.redirect('/forgot');
                } else {
                    sails.models.passport.update(
                        {UserId: user.id, Protocol: 'local'},
                        { resetPasswordToken: token, resetPasswordExpires: expires }
                    ).exec(function (err, results) {
                        if (err) return next(err);

                        var mailOptions = {
                            email: user.email,
                            reset: sails.config.myLinks.url + '/reset/' + token
                        };

                        console.log('send mail with mailoptions');
                        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                        res.redirect('/login');
                    });
                }
            });
    },

    resetPassword: function (req, res, next) {
        if (!req.params.token || !req.params.token.length) return res.redirect('/forgot');
        sails.models.passport.findOne({
            where: {
                resetPasswordToken: req.params.token
            }
        }).populate('User').exec(function (err, passport) {
            if (err) return next(err);
            if (!passport) {
                req.flash('error', 'The password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            res.locals.token = req.params.token;
            res.locals.user = passport.User;
            res.view('pages/reset');
        });
    },
    setPassword: function (req, res, next) {
        if (!req.params.token || !req.params.token.length) {
            req.flash('error', 'The token attached with this link is missing');
            return res.view('pages/index');
        }

        sails.models.passport.findOne({
            where: {
                resetPasswordToken: req.params.token
            }
        }).populate('User').exec(function (err, passport) {
            if (err) return next(err);


            if (!passport) {
                req.flash('error', 'The password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            res.locals.token = req.params.token;
            res.locals.user = passport.User;
            res.view('pages/setPassword');
        });
    },
    resetPasswordSubmit: function (req, res, next) {
        if (req.body.password !== req.body.confirmPassword) {
            req.flash('error', 'The two passwords that you enter have to match. Please try again.');
            return res.redirect('/');
        }
        sails.models.passport.findOne({
            where: {
                resetPasswordToken: req.body.token
            }
        }).populate('User').exec(function (err, passport) {
            if (err) return next(err);
            if (!passport) {
                req.flash('error', 'The password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            sails.models.passport.update(
                {where: {id: passport.id}},
                {
                    resetPasswordToken: null,
                    resetPasswordExpires: null,
                    password: req.body.password,

                }
            ).exec(function (err, results) {

                if (err) return next(err);
                sails.models.users.update(
                    {where: {id: passport.id}},
                    {
                        isActivated: 1
                    }
                ).exec(function (err, results) {

                    if (err) return next(err);

                    req.flash('success', 'Success! Your password has been changed.');
                    return res.redirect('/login');
                });
            });
        });
    },
    changePassword: function(req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(500).json('The two passwords that you enter have to match. Please try again.');
        }

        sails.models.passport.update(
            { where: { userId: req.body.id } },
            { password: req.body.password }
        ).exec(function (err, results) {
            if (err) {
                if (err.invalidAttributes) {
                    var rule = err.invalidAttributes.password[0].rule;
                    var msg = "";

                    if (rule == "minLength") {
                        msg = "Password should contain at least eight characters."
                    }

                    return res.negotiate(err);
                }
                return res.negotiate(err);
            }
            return res.redirect('back');
        });
    },
    activateUser: function (req, res, next) {
        if (!req.params.token || !req.params.token.length) return res.redirect('/');
        sails.models.passport.findOne({ activationToken: req.params.token })
            .populate('User')
            .exec(function (err, passport) {
                if (err) return next(err);
                if (!passport) {
                    //token does not exist
                    req.flash('error', 'The account activation token is invalid.');

                    return res.redirect('/dashboard');
                }
                if (passport.User.id !== req.user.id) {
                    //token does not belong to authenticated user
                    req.flash('error', 'The account activation token is invalid.');

                    return res.redirect('/');
                }

                sails.models.users.update({ id: req.user.id }, { isActivated: true })
                    .exec(function (err, user) {
                        req.flash('success', 'Your account has been successfully activated.');
                        res.redirect('/');
                    });
            });
    },
    login: function (req, res) {
        if (req.session.authenticated) {
            return res.redirect('/');
        }
        res.view('pages/login');
    },

    logout: function (req, res) {
        req.logout();
        // mark the user as logged out for auth purposes
        req.session.authenticated = false;
        res.redirect('/login');
    },
    register: function (req, res) {
        if (req.session.authenticated) {
            return res.redirect('/');
        }
        res.view('pages/signup');
    },

    /**
    * Create a third-party authentication endpoint
    *
    * @param {Object} req
    * @param {Object} res
    */
    provider: function (req, res) {
        passport.endpoint(req, res);
    },

    /**
    * Create a authentication callback endpoint
    *
    * This endpoint handles everything related to creating and verifying Pass-
    * ports and users, both locally and from third-aprty providers.
    *
    * Passport exposes a login() function on req (also aliased as logIn()) that
    * can be used to establish a login session. When the login operation
    * completes, user will be assigned to req.user.
    *
    * For more information on logging in users in Passport.js, check out:
    * http://passportjs.org/guide/login/
    *
    * @param {Object} req
    * @param {Object} res
    */
    callback: function (req, res) {

        function tryAgain (err) {
            req.flash('error', err);
            req.flash('form', req.body);
            // If an error was thrown, redirect the user to the
            // login, register or disconnect action initiator view.
            // These views should take care of rendering the error messages.
            var action = req.param('action');

            switch (action) {
                case 'register':
                res.redirect('/signup');
                break;
                case 'disconnect':
                res.redirect('back');
                break;
                default:
                res.redirect('/login');
            }
        }

        // function validCaptcha () {
        //     return (req.body && req.body['g-recaptcha-response'] && req.body['g-recaptcha-response'].length);
        // }

        // // if (req.params.action === 'register' && !validCaptcha()) {
        // //     return tryAgain('Please verify that you are not a robot');
        // // }

        if (req.params.action === 'register' && (req.body.password !== req.body.confirmPassword)) {
            return tryAgain('Passwords do not match');
        }


        passport.callback(req, res, function (err, user, challenges, statuses) {
            console.log(arguments);
            if (err) {
                sails.log.error('AuthController#callback - Error during passport.callback() call.');
                sails.log.error(err);
                console.log(err);
                if (err.code === 'E_VALIDATION') {
                    return tryAgain(err.invalidAttributes);
                } else {
                    return tryAgain(err)
                }
            }

            req.login(user, function (err) {
                if (err) {
                    sails.log.error('AuthController#callback - Error while logging in to the account.');
                    sails.log.error(err);
                    console.log(err);
                    return tryAgain(err);
                }

                req.session.authenticated = true;
                req.session.user = user;

                req.session.settings = {};
                if (req.params.action === 'register') {
                    req.flash('success', 'Your account has been successfully created!.');

                    res.redirect('/');
                } else {
                    res.redirect('/');
                }
            });
        });
    },

    /**
    * Disconnect a passport from a user
    *
    * @param {Object} req
    * @param {Object} res
    */
    disconnect: function (req, res) {
        passport.disconnect(req, res);
    }
};

module.exports = AuthController;
