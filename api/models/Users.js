/**
 * Vertical.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcryptjs');
var uuid = require('uuid');


module.exports = {
    tableName: 'Users',
    migrate: 'safe',
    attributes: {
        email: {
            type: 'string',
            unique: true
        },
        isActivated: {
            type: 'boolean',
            defaultsTo: false
        },
        Passports : {
            collection: 'Passport',
            via: 'User'
        }
    },
    beforeValidate: function(record, next){
        next();
    },
    beforeCreate: function(values, cb) {
        values.activationToken = uuid.v1();
        cb();
    }
};
