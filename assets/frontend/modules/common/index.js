var flux = require('../../reactor');

flux.registerStores({});

module.exports = {
    actions: require('./actions'),
    getters: require('./getters')
};