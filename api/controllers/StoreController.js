/**
 * StoreController
 *
 * @description :: Server-side logic for managing Stores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const async = require("async");

module.exports = {
    findOne(req, res) {
        const Stores = sails.models.store;
        const Achievements = sails.models.achievement;
        const Missions = sails.models.mission;
        const Milestones = sails.models.milestone;

        const storeId = req.params.id;

        async.parallel(
            {
                store: cb => {
                    Stores.findOne(storeId).exec(cb);
                },

                achievements: cb => {
                    Achievements.find({ storeId: storeId }).exec(cb);
                },

                milestones: cb => {
                    Milestones.find({ storeId: storeId }).exec(cb);
                },

                mission: cb => {
                    Missions.findOne({ storeId: storeId }).exec(cb);
                }
            },
            (err, results) => {
                if (err) return res.serverError(err);
                else {
                    let { store, achievements, mission, milestones } = results;

                    store.achievements = achievements;
                    store.mission = mission;
                    store.milestones = milestones;

                    return res.json(store);
                }
            }
        );
    }
};
