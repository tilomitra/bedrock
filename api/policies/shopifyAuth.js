module.exports = (req, res, next) => {
    if (req.session.store) return next();
    else res.render("403");
};
