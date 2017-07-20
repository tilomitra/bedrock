module.exports = function(req, res, next) {
    const Stores = sails.models.store;
    let storeId = req.params.storeId || req.query.storeId;
    let nonce = req.headers.nonce;

    storeId = parseInt(storeId);

    if (storeId === req.session.store.id) {
        res.locals.store = req.session.store;
        next();
    } else {
        return res.render("403");
    }
};
