// concurrentWebpack.js
module.exports = function (grunt) {
    grunt.registerTask('concurrentWebpack', [
        'webpack:dev',
    ]);
};