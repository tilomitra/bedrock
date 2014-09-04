//Store your API Keys and stuff here.
'use strict';

var path = require('path');
module.exports = {
    dirs: {
        pub     : path.resolve('public/'),
        bower   : path.resolve('bower_components/'),
        views   : path.resolve('views/'),
        layouts : path.resolve('views/layouts/'),
        partials: path.resolve('views/partials/'),
        shared  : path.resolve('shared/templates/')
    }
};