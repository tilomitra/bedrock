module.exports = function(req, res, next) {
    const Stores = sails.models.store;
    var nonce = req.headers.nonce;

    Stores.findOne({ nonce: nonce })
        .then(store => {
            res.locals.store = store;
            next();
        })
        .catch(err => {
            return res.redirect(401);
        });
};
