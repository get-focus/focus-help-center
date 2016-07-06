const webpackConfig = require('./webpack.config');
const serverLauncher = require('webpack-focus').serverLauncher;

console.log(process.env.APP_LAUNCHED);

serverLauncher(webpackConfig(process.env.APP_LAUNCHED, true), {proxy: null});
