const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (app, isDev) => ({
    entry: Object.assign({
        [app]: `./src/${app}/index`
    }, isDev ? ['webpack-dev-server/client?http://localhost:9999', 'webpack/hot/only-dev-server'] : {}),
    output: {
        path: path.resolve('dist'),
        filename: app === 'back-office' ? 'index.js' : '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/common/index.html',
            filename: app === 'back-office' ? 'index.html' : `${app}.html`
        }),
        new webpack.DefinePlugin({
            'process.env.LANG': `"${process.env.LANG}"`,
            'process.env.ENV': `"${process.env.ENV}"`
        })
    ].concat(isDev ? [
        new webpack.HotModuleReplacementPlugin()
    ] : []),
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.d.ts']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: isDev ? 'react-hot!babel' : 'babel'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                query: {
                    useBabel: true
                }
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
});
