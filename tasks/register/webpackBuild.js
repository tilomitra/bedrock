module.exports = function (grunt) {
    grunt.registerTask('webpackBuild', [
        'clean:dev',
        'sass:dev',
        'concat',
        'copy:concat',
        'copy:dev',
        'webpack:dev'
    ]);
};
