/**
 * Browserify front-end app
 *
 * ---------------------------------------------------------------
 *
 */

module.exports = function(grunt) {
    grunt.config.set("webpack", {
        options: {
            stats:
                !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        },
        prod: require("../../webpack.config.prod"),
        dev: Object.assign({ watch: true }, require("../../webpack.config.dev"))
    });

    grunt.loadNpmTasks("grunt-webpack");
};
