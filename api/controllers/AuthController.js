var uuid = require('uuid');
/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {
  /**
   * Render the login page
   *
   * The login form itself is just a simple HTML form:
   *
      <form role="form" action="/auth/local" method="post">
        <input type="text" name="identifier" placeholder="Username or Email">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Sign in</button>
      </form>
   *
   * You could optionally add CSRF-protection as outlined in the documentation:
   * http://sailsjs.org/#!documentation/config.csrf
   *
   * A simple example of automatically listing all available providers in a
   * Handlebars template would look like this:
   *
      {{#each providers}}
        <a href="/auth/{{slug}}" role="button">{{name}}</a>
      {{/each}}
   *
   * @param {Object} req
   * @param {Object} res
   */
  login: function (req, res) {
    var strategies = sails.config.passport
      , providers  = {};

    // Get a list of available providers for use in your templates.
    Object.keys(strategies).forEach(function (key) {
      if (key === 'local') {
        return;
      }

      providers[key] = {
        name: strategies[key].name
      , slug: key
      };
    });

    // Render the `auth/login.ext` view
    res.view({
      providers : providers
    , errors    : req.flash('error')
    });
  },

  /**
   * Log out a user and return them to the homepage
   *
   * Passport exposes a logout() function on req (also aliased as logOut()) that
   * can be called from any route handler which needs to terminate a login
   * session. Invoking logout() will remove the req.user property and clear the
   * login session (if any).
   *
   * For more information on logging out users in Passport.js, check out:
   * http://passportjs.org/guide/logout/
   *
   * @param {Object} req
   * @param {Object} res
   */
  logout: function (req, res) {
    req.logout();
    
    // mark the user as logged out for auth purposes
    req.session.authenticated = false;
    
    res.redirect('/');
  },

  /**
   * Render the registration page
   *
   * Just like the login form, the registration form is just simple HTML:
   *
      <form role="form" action="/auth/local/register" method="post">
        <input type="text" name="username" placeholder="Username">
        <input type="text" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Sign up</button>
      </form>
   *
   * @param {Object} req
   * @param {Object} res
   */
  register: function (req, res) {
    res.view({
      errors: req.flash('error')
    });
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
    function matchingPasswords() {
        return (req.body && req.body.password && req.body.password === req.body.confirmPassword);
    }

    if (req.params.action === 'register' && !matchingPasswords()) {
        return tryAgain('Passwords do not match');
    }

    passport.callback(req, res, function (err, user, challenges, statuses) {
        if (err) {
            if (err.code === 'E_VALIDATION') {
                return tryAgain(err.invalidAttributes);
            } else {
                return tryAgain(err)
            }
        }

        req.login(user, function (err) {
            if (err) {
                return tryAgain(err);
            }
            // Mark the session as authenticated to work with default Sails sessionAuth.js policy
            req.session.authenticated = true;
            req.session.userEmail = user.email;

            if (req.params.action === 'register') {
                req.flash('Created account. please login.')
                res.redirect('/login');
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
  },
  forgotPassword: function (req, res, next) {
      res.view('pages/forgot', {layout: 'blank'});
  },
  forgotPasswordSubmit: function (req, res, next) {
    var email = req.body.email;
    var Users = sails.models.user;
    
    Users.findOne({email: email})
    .exec(function(err, user) {
        var token = uuid.v1();
        var expires = new Date(Date.now() + 3600000); // 1 hour
        if (err) return next(err);
        if (!user) {
            req.flash('error', 'No user with email address ' + email);
            res.redirect('/forgot');
        } 
        else {
          sails.models.passport.update(
              {user: user.id, protocol: 'local'},
              { resetPasswordToken: token, resetPasswordExpires: expires }
          ).exec(function (err, results) {
              if (err) return next(err);

              Mailer.sendMail({
                to: user.email,
                subject: 'Reset your password',
                text: 'Go to this link to reset your password: ' + sails.config.url + '/reset/' + token
              }, function (err) {
                if (err) {
                  sails.log.error('Error sending password reset mail');
                  sails.log.error(err);
                  req.flash('error', 'There was an error sending your reset password link. Please try again, or send us a direct email at ' + sails.config.email.gmail.fromAddress);
                }
                else {
                  req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                }
                res.redirect('/login');
              });
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
      }).populate('user').exec(function (err, passport) {
          if (err) return next(err);
          if (!passport) {
              req.flash('error', 'The password reset token is invalid or has expired.');
              return res.redirect('/forgot');
          }
          res.locals.token = req.params.token;
          res.locals.user = passport.user;
          res.view('pages/reset', {layout: 'blank'});
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
      }).populate('user').exec(function (err, passport) {
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
            req.flash('success', 'Success! Your password has been changed.');
            return res.redirect('/login');
          });
      });
  },

};

module.exports = AuthController;
