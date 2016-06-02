const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (app, isDev) => ({
    entry: Object.assign({
        [app]: `./src/${app}/index`
    }, isDev ? [`webpack-dev-server/client?http://localhost:9999`, 'webpack/hot/only-dev-server'] : {}),
    output: {
        path: path.resolve('dist'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/common/index.html',
            filename: `${app}.html`
        })
    ].concat(isDev ? [
        new webpack.HotModuleReplacementPlugin()
    ] : []),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: isDev ? 'react-hot!babel' : 'babel'
            }
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    }
});
