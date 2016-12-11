module.exports = function(grunt) {
    grunt.registerTask('compileAssets', [
        'clean:dev',
        'sass:dev',
        'copy:dev',
        'concat',
        'browserify',
        'copy:concat',
        'copy:dev'
    ]);
};