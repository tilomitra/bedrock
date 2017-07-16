/**
 * Mission.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: "Missions",
    attributes: {
        title: "string",
        subtitle: "string",
        storeId: { model: "Store" }
    }
};
