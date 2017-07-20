module.exports = function(req, res, next) {
    const Stores = sails.models.store;
    var storeId = req.params.storeId;
    var nonce = req.headers.nonce;

    if (storeId === req.session.store.id) {
        res.locals.store = req.session.store;
        next();
    } else {
        return res.redirect(401);
    }
};
