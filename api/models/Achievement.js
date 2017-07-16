/**
 * Achievement.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: "Achievements",
    attributes: {
        name: "string",
        publicationName: "string",
        publishLink: "string",
        imageUrl: "string",
        type: "string",
        storeId: { model: "Store" }
    }
};
