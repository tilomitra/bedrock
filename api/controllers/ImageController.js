/**
 * GalleryController
 *
 * @description :: Server-side logic for managing Galleries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    refresh(req, res) {
        const store = res.locals.store;
        const Images = sails.models.image;

        const images = req.body.images;

        if (!images) return res.notFound();

        const createPromises = images.map(v => {
            return Images.create({
                imageUrl: v.imageUrl,
                caption: v.caption,
                storeId: store.id
            });
        });

        Images.destroy({
            storeId: store.id
        })
            .then(() => {
                return Promise.all(createPromises);
            })
            .then(created => {
                return res.json(created);
            })
            .catch(err => {
                return res.serverError(err);
            });
    }
};
