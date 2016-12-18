/**
 * CSRF Policy
 * 
 * Policy for exposing the CSRF token to locals
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

module.exports = function (req, res, next) {
    var token;
    var email;
    // This is sometimes undefined, but I have not been able to reproduce
    if (!req.csrfToken) {
        email = req.user ? req.user.email : 'undefined';
        sails.log.info("CSRF token function undefined for user: " + email + " on path: " + req.path);
        return next();
    }

    token = req.csrfToken();
    res.locals._csrf = token;
    res.expose(token, '_csrf');
    next();
};
