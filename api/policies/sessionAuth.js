/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

"use strict";

module.exports = function (req, res, next) {

  // User is allowed, proceed to controller
  if (req.isAuthenticated()) {
    return next();
  }

  req.session.returnTo = req.originalUrl;

  // User is not allowed
  return res.redirect("/login");
};