module.exports = function(grunt) {
    grunt.registerTask("build", [
        "concurrent:buildJs"
        //'concurrent:buildCss'
    ]);
};
