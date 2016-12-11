// concurrent.js
module.exports = function(grunt) {
    grunt.config.set('concurrent', {
        'devWebpack': {
            tasks: ['webpack:dev','node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
};