/**
 * Browserify front-end app
 *
 * ---------------------------------------------------------------
 *
 */
var path = require("path");
var webpack = require("webpack");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({ name: "common" });
var maxChunks = new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 });
var minSize = new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 });

//const distRootPath = path.resolve(__dirname, "../../", "/.tmp/public/js/dist");

var loaders = [
    {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
            presets: ["es2015", "react"]
        }
    },
    {
        test: /\.json$/,
        loader: "json-loader"
    }
];

var extensions = [".js", ".json"];

var ignoreModules = {
    fs: "empty",
    tls: "empty",
    dns: "empty",
    net: "empty",
    console: true
};

const webpackConfig = {
    entry: path.resolve(__dirname, "../../assets/frontend/app.js"),
    output: {
        path: path.resolve(__dirname, "../../.tmp/public/js/dist"),
        filename: "frontend.js"
    },
    module: {
        loaders: loaders,
        noParse: /node_modules\/json-schema\/lib\/validate\.js/ // NOTE: this workaround as suggested from: https://github.com/request/request/issues/1920 (due to issues with webpack & request.js causing error message "define cannot be used indirect")
    },
    resolve: {
        extensions: extensions
    },
    node: ignoreModules,
    plugins: [
        maxChunks,
        minSize,
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        })
    ]
};

module.exports = function(grunt) {
    grunt.config.set("webpack", {
        options: {
            stats:
                !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        },
        prod: webpackConfig,
        dev: Object.assign({ watch: true }, webpackConfig)
    });

    grunt.loadNpmTasks("grunt-webpack");
};
