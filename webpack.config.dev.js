const path = require("path");
const webpack = require("webpack");
const NODE_ENV = process.env.NODE_ENV;
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({ name: "common" });
var maxChunks = new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 });
var minSize = new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 });

//const distRootPath = path.resolve(__dirname, "../../", "/.tmp/public/js/dist");

var loaders = [
    {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["react-hot-loader/webpack", "babel-loader"]
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
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:3000/",
        "webpack/hot/dev-server",
        path.resolve(__dirname, "./assets/frontend/app.js")
    ],
    output: {
        path: path.resolve(__dirname, "./.tmp/public/js/dist"),
        filename: "frontend.js",
        publicPath: "/js/dist/"
    },
    module: {
        loaders: loaders
    },
    resolve: {
        extensions: extensions
    },
    node: ignoreModules,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __ENV__: NODE_ENV
        }),
        maxChunks,
        minSize
    ]
};

module.exports = webpackConfig;
