/**
 * Team.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: "TeamMembers",
    attributes: {
        name: "string",
        position: "string",
        email: "string",
        description: "string",
        imageUrl: "string",
        storeId: { model: "Store" }
    }
};
