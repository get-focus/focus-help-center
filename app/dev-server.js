var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

console.log(process.env.APP_LAUNCHED);

new WebpackDevServer(webpack(webpackConfig(process.env.APP_LAUNCHED, true)), {
    proxy: null
}).listen(process.env.DEV_SERVER_PORT, process.env.DEV_SERVER_HOST, err => {
    if (err) {
        console.log(err);
    }
    console.log(`Listening at ${process.env.DEV_SERVER_HOST}:${process.env.DEV_SERVER_PORT}`);
});
