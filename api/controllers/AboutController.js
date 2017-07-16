/**
 * AboutController
 *
 * @description :: Server-side logic for managing Abouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    refresh(req, res) {
        const store = res.locals.store;
        const About = sails.models.about;

        const about = req.body.abouts;

        if (!about) return res.notFound();

        About.destroy({
            storeId: store.id
        })
            .then(() => {
                return About.create({
                    html: about.html
                });
            })
            .then(model => {
                return res.json(model);
            })
            .catch(err => {
                return res.serverError(err);
            });
    }
};
