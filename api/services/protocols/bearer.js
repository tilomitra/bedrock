/*
 * Bearer Authentication Protocol
 *
 * Bearer Authentication is for authorizing API requests. Once
 * a user is created, a token is also generated for that user
 * in its passport. This token can be used to authenticate
 * API requests.
 *
 */

exports.authorize = function(token, done) {

    Passport.findOne({ accessToken: token }, function(err, passport) {
        if (err) { return done(err); }
        if (!passport) { return done(null, false); }

        sails.models.users.findById(passport.User)
        .populate('type')
        .exec(function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            user = user[0];
            user.isAdmin = passport.admin;
            return done(null, user, { scope: 'all' });
        });
    });

};
