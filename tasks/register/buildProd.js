module.exports = function (grunt) {
    grunt.registerTask('buildProd', [
        'webpackBuildProd',
        'linkAssetsBuildProd',
        'clean:build',
        'copy:build'
    ]);
};
