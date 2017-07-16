/**
 * Milestone.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: "Milestones",
    attributes: {
        description: "string",
        amount: "float",
        type: "string",
        color: "string",
        storeId: { model: "Store" }
    }
};
