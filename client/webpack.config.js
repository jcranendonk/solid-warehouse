var ExtractTextPlugin = require('extract-text-webpack-plugin');
var notifier = require('node-notifier');

function NotifyPlugin() {}
NotifyPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', function(stats) {
        var jsonStats = stats.toJson();
        var errorCount = jsonStats.errors.length;

        notifier.notify({
            title: 'Sox JS - Watch',
            message: stats.hasErrors() ? errorCount + ' Build Error(s)' : 'Build Complete',
            sound: stats.hasErrors() ? 'Funk' : false
        });
    });
};

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
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css!less')
        }, {
            test: /\/img\//,
            loader: 'file?name=img/[hash].[ext]'
        }, {
            test: /\/fonts\//,
            loader: 'file?name=fonts/[hash].[ext]'
        }]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new NotifyPlugin()
    ]
};
