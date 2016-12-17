var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {

    async.series([
        function (cb) {
            db.createTable('Passports', {
                id: { type: 'int', primaryKey: true, autoIncrement: true },
                user: {type: 'int'},
                protocol: { type: 'string', length: 255 },
                password: { type: 'string', length: 255 },
                provider: 'string',
                accessToken: 'string',
                identifier: 'string',
                activationToken: 'string',
                resetPasswordToken: 'string',
                resetPasswordExpires: 'datetime',
                admin: 'boolean',
                createdAt: 'datetime',
                updatedAt: 'timestamp'
            }, cb);
        },

        function (cb) {
            db.createTable('Users', {
                id: { type: 'int', primaryKey: true, autoIncrement: true },
                email: { type: 'string', length: 255, unique: true },
                username: { type: 'string', length: 255, unique: true },
                createdAt: 'datetime',
                updatedAt: 'timestamp'
            }, cb);
        }
    ], callback);

};

exports.down = function(db, callback) {
    async.series([
        function (cb) {
            db.dropTable('Passports', cb);
        },
        function (cb) {
            db.dropTable('Users', cb)
        }
    ], callback);
};