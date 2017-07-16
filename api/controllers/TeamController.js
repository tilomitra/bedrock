/**
 * TeamController
 *
 * @description :: Server-side logic for managing Teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    refresh(req, res) {
        const store = res.locals.store;
        const Team = sails.models.team;

        const team = req.body.teams;

        if (!team) return res.notFound();

        const createPromises = team.map(v => {
            return Team.create({
                name: v.name,
                position: v.position,
                email: v.email,
                description: v.description,
                imageUrl: v.imageUrl,
                storeId: store.id
            });
        });

        Team.destroy({
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
