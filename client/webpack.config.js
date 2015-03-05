var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/js/app'
    },
    output: {
        path: __dirname + '/../static',
        publicPath: '/',
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'babel': 'babel-core'
        }
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            // Ignore bower/node packages
            exclude: /\/(bower_components|node_modules)\//,
            loader: 'babel?experimental'
        }, {
            // Include js-csp
            test: /\/node_modules\/js-csp\/.*\.js$/,
            loader: 'babel?experimental'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }, {
            test: /\/img\//,
            loader: 'file?name=img/[hash].[ext]'
        }, {
            test: /\/fonts\//,
            loader: 'file?name=fonts/[hash].[ext]'
        }]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css')
    ]
};
