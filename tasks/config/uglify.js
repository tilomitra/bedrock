/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 *         https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

    grunt.config.set('uglify', {
        options: {
            nameCache: '.tmp/grunt-uglify-cache.json',
            mangleProperties: true,
            reserveDOMCache: true,
            compress: {
                global_defs: {
                    "DEBUG": false
                },
                dead_code: true
            }
        },
        frontend: {
            files: [
                {
                    expand: true,
                    cwd: '.tmp/public/js/dist',
                    src: ['**/*'],
                    dest: '.tmp/public/js/dist'
                }
            ]
        },
        deps: {
            src: ['.tmp/public/js/dist/dependencies.js'],
            dest: '.tmp/public/js/dist/dependencies.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};
