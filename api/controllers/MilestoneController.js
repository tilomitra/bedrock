/**
 * MilestoneController
 *
 * @description :: Server-side logic for managing Milestones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    refresh(req, res) {
        const store = res.locals.store;
        const Milestones = sails.models.milestone;

        const milestones = req.body.milestones;

        if (!milestones) return res.notFound();

        const createPromises = milestones.map(v => {
            return Milestones.create({
                description: v.description,
                amount: parseFloat(v.amount),
                type: v.type,
                color: v.color,
                storeId: store.id
            });
        });

        Milestones.destroy({
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
