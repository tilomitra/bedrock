module.exports = function (grunt) {
    grunt.registerTask('build', [
        'webpackBuild',
        'linkAssetsBuild'
    ]);
};
