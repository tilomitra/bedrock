/**
 * AchievementController
 *
 * @description :: Server-side logic for managing Missions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    refresh(req, res) {
        const store = res.locals.store;
        const Achievements = sails.models.achievement;

        const achievements = req.body.achievements;

        if (!achievements) return res.notFound();

        const createPromises = achievements.map(v => {
            return Achievements.create({
                name: v.name,
                publicationName: v.publicationName,
                publishLink: v.publishLink,
                imageUrl: v.imageUrl,
                type: v.type,
                storeId: store.id
            });
        });

        Achievements.destroy({
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
