/**
 * Browserify front-end app
 *
 * ---------------------------------------------------------------
 *
 */
var webpack = require("webpack");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin(
    "common",
    null,
    false
);
var maxChunks = new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 });
var minSize = new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 });
var occurrenceOrder = new webpack.optimize.OccurenceOrderPlugin(true);
var dedupe = new webpack.optimize.DedupePlugin();
var providePlugin = new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
});

var loaders = [
    {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
            presets: ["es2015", "react"]
        }
    },
    {
        test: /\.json$/,
        loader: "json-loader"
    },
    {
        test: /\.sass$/,
        loaders: ["style-loader", "css-loader"]
    },
    {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
    }
];

var extensions = ["", ".js", ".json"];

var ignoreModules = {
    fs: "empty",
    tls: "empty",
    dns: "empty",
    net: "empty",
    console: true
};

module.exports = function(grunt) {
    grunt.config.set("webpack", {
        prod: {
            failOnError: false,
            entry: {
                frontend: "./assets/frontend/app.js"
            },
            output: {
                path: ".tmp/public/js/dist",
                publicPath: "/js/dist/",
                filename: "[name].js",
                chunkFilename: "[id].chunk.js"
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
                dedupe,
                maxChunks,
                minSize,
                occurrenceOrder,
                providePlugin,
                new webpack.DefinePlugin({
                    "process.env": {
                        NODE_ENV: '"production"'
                    }
                })
            ]
        },
        dev: {
            failOnError: false,
            entry: {
                frontend: "./assets/frontend/app.js"
            },
            output: {
                path: ".tmp/public/js/dist",
                publicPath: "/js/dist/",
                filename: "[name].js",
                chunkFilename: "[id].chunk.js"
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
                dedupe,
                maxChunks,
                minSize,
                occurrenceOrder,
                providePlugin
            ],
            keepalive: true,
            watch: true
        }
    });

    grunt.loadNpmTasks("grunt-webpack");
};
