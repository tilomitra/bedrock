module.exports = function (grunt) {
    grunt.registerTask('webpackBuildProd', [
        'clean:dev',
        'sass:dev',
        'concat',
        'webpack:prod',
        'copy:concat',
        'copy:dev',
        'uglify:frontend',
        'cssmin',
        'compress',
        'copy:compressed',
        'clean:unused'
    ]);
};
