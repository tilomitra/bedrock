/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {

    grunt.config.set('cssmin', {
        dist: {
            src: ['.tmp/public/styles/app.css'],
            dest: '.tmp/public/styles/app.min.css'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
};