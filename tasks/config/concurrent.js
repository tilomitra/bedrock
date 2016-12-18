// concurrent.js
module.exports = function(grunt) {
    grunt.config.set('concurrent', {
        'buildJs': ['webpackBuild', 'linkAssetsBuild'],
        'buildCss': ['watch'],
        options: {
            logConcurrentOutput: true
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
};