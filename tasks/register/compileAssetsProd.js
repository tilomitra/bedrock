module.exports = function (grunt) {
    grunt.registerTask('compileAssetsProd', [
        'clean:dev',
        'sass:dev',
        'concat',
        'browserify',
        'copy:concat',
        'copy:dev',
        'cssmin',
        'uglify:frontend',
        //'rev',
        'compress',
        'copy:compressed',
        'clean:unused'
    ]);
};
