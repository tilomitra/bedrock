/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 *         https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

    grunt.config.set('concat', {
        css: {
            src: [
                'assets/styles/dependencies/**/*.css'
            ],
            dest: '.tmp/public/concat/styles/dependencies.css'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
};
