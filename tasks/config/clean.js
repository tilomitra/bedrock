/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

    grunt.config.set('clean', {
        dev: ['.tmp/public/**'],
        build: ['www'],
        unused: [
            './tmp/public/js/concat/**',
            '.tmp/public/js/dist/gz/**',
            '.tmp/public/styles/dist/gz/**'
        ]
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};