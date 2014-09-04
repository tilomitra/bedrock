/*!
templates.js

Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
*/

'use strict';

var path      = require('path'),
    sharedDir = require('../config').dirs.shared,
    exphbs    = require('../lib/exphbs');

// RegExp to remove the ".handlebars" extension from the template names.
var extRegex = new RegExp(exphbs.extname + '$');

module.exports = function exposeTemplates(templatesDir) {

    templatesDir = templatesDir || '';

    var namespace = 'templates.' + templatesDir.replace(/\//g, '.');

    // Make sure namespace does not end with a ".".
    namespace = namespace.replace(/\.$/, '');

    return function (req, res, next) {
        // Uses the `ExpressHandlebars` instance to get the get the
        // **precompiled** templates which will be shared with the client-side
        // of the app.
        exphbs.getTemplates(path.join(sharedDir, templatesDir), {
            precompiled: true
        }).then(function (templates) {
            templates = Object.keys(templates).reduce(function (map, name) {
                // Evaluate the precompiled template string into a function.
                var template; eval('template = ' + templates[name]);
                map[name.replace(extRegex, '')] = template;
                return map;
            }, {});

            // Exposes the templates via express-state.
            res.expose(templates, namespace);
            next();
        }).catch(function (error) {
            next(error);
        });
    };
};