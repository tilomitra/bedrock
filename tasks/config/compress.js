/**
 * Compress production files
 *
 * ---------------------------------------------------------------
 * https://github.com/gruntjs/grunt-contrib-compress
 */
module.exports = function(grunt) {

    grunt.config.set('compress', {
        main: {
            options: {
                mode: 'gzip',
                pretty: true
            },
            files: [
                {
                    expand: true,
                    cwd: '.tmp/public/js/dist',
                    src: ['*.js'],
                    dest: '.tmp/public/js/dist/gz',
                },
                {
                    expand: true,
                    cwd: '.tmp/public/styles/dist',
                    src: ['*.css'],
                    dest: '.tmp/public/styles/dist/gz',
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
};
