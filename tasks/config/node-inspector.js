/**
 * Node-inspector
 *
 * ---------------------------------------------------------------
 *
 */
module.exports = function(grunt) {
    grunt.config.set('node-inspector', {
        custom: {
            options: {
              'web-host': 'localhost',
              'web-port': 1338,
              'debug-port': 5858,
              'save-live-edit': true,
              'preload': false,
              'hidden': ['node_modules']
            }
          }
    });

    grunt.loadNpmTasks('grunt-node-inspector');
};
