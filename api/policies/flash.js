/**
 * flash Policy
 *
 * Policy for handling flash messages
 * their own.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

"use strict";

module.exports = function (req, res, next) {
    var keys;
    var messages = {};
    if (req.session.flash) {
        keys = Object.keys(req.session.flash);

        keys.forEach(function (key) {
            messages[key] = req.flash(key);
        });
    }

    res.locals.messages = messages;
    next();
};
