module.exports = (req, res, next) => {
    if (req.session.store) {
        sails.hooks.http.app.expose(req.session.store.id, "App.Store.id");
        sails.hooks.http.app.expose(req.session.store.name, "App.Store.name");
        sails.hooks.http.app.expose(req.session.store.nonce, "App.Store.nonce");
        return next();
    } else res.render("403");
};
