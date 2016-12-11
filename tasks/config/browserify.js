/**
 * Browserify front-end app
 *
 * ---------------------------------------------------------------
 *
 */

module.exports = function(grunt) {

    grunt.config.set('browserify', {
        options: {
            transform: [require('grunt-react').browserify, ['babelify', {stage: 0}], ['envify'] ]
        },
        app: {
            src: 'assets/frontend/app.js',
            dest: '.tmp/public/js/app.min.js'
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};
