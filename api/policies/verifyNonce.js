module.exports = function(req, res, next) {
    const Stores = sails.models.store;
    var nonce = req.headers.nonce;

    if (nonce === req.session.store.nonce) {
        res.locals.store = req.session.store;
        next();
    } else {
        return res.render("401");
    }
};
