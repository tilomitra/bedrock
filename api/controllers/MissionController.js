/**
 * MissionController
 *
 * @description :: Server-side logic for managing Missions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    refresh(req, res) {
        const store = res.locals.store;
        const Mission = sails.models.mission;

        const missions = req.body.missions;

        if (!missions) return res.notFound();

        Mission.destroy({
            storeId: store.id
        })
            .then(() => {
                return Mission.create({
                    title: missions.title,
                    subtitle: missions.subtitle,
                    storeId: store.id
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
