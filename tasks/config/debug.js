/**
 * Debug other grunt tasks
 *
 * ---------------------------------------------------------------
 *
 */

module.exports = function(grunt) {

    grunt.config.set('debug', {
        options: {
            open: true
        }
    });

    grunt.loadNpmTasks('grunt-debug-task');
};
