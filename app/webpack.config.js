const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (app, isDev) => ({
    entry: Object.assign({
        [app]: `./${app}/index`
    }, isDev ? [`webpack-dev-server/client?http://localhost:9999`, 'webpack/hot/only-dev-server'] : {}),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './common/index.html',
            filename: `${app}.html`
        })
    ].concat(isDev ? [
        new webpack.HotModuleReplacementPlugin()
    ] : []),
    loaders: [
        {
            test: /\.jsx?$/,
            include: ['common', app],
            loader: isDev ? 'react-hot!babel' : 'babel',
            query: {
                presets: ['focus']
            }
        }
    ]
});
