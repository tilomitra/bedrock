/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *         https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

    grunt.config.set('copy', {
        dev: {
            files: [
                {
                    expand: true,
                    cwd: './assets/images',
                    src: ['**/*'],
                    dest: '.tmp/public/images'
                },
                {
                    expand: true,
                    cwd: './assets',
                    src: ['favicon.ico'],
                    dest: '.tmp/public'
                }
            ]
        },
        concat: {
            files: [
                {
                    expand: true,
                    cwd: '.tmp/public/concat/js',
                    src: ['*.js'],
                    // For now, copy straight deps into dist folder.
                    // Normally this happens in the uglify process,
                    // but we can't count uglify to work on random dependencies
                    // included here. Later on, we can better organize which dependencies
                    // get uglified
                    dest: '.tmp/public/js/dist'
                },
                {
                    expand: true,
                    cwd: '.tmp/public/concat/styles',
                    src: ['*.css'],
                    dest: '.tmp/public/styles'
                }
            ]
        },
        concatStyles: {
            files: [
                {
                    expand: true,
                    cwd: '.tmp/public/concat/styles',
                    src: ['*.css'],
                    dest: '.tmp/public/styles'
                }
            ]
        },
        compressed: {
            files: [
                {
                    expand: true,
                    cwd: '.tmp/public/js/dist/gz',
                    src: ['*.js'],
                    dest: '.tmp/public/js/dist',
                    rename: function (dest, src) {
                        var name = src + '.gz';
                        return dest + '/' + name;
                    }
                },
                {
                    expand: true,
                    cwd: '.tmp/public/styles/dist/gz',
                    src: ['*.css'],
                    dest: '.tmp/public/styles/dist',
                    rename: function (dest, src) {
                        var name = src + '.gz';
                        return dest + '/' + name;
                    }
                }
            ]
        },
        build: {
            files: [{
                expand: true,
                cwd: '.tmp/public',
                src: ['**/*'],
                dest: 'www'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
