const webpackConfig = require('./webpack.config');
const serverLauncher = require('webpack-focus').serverLauncher;

serverLauncher(webpackConfig('back-office', true), {proxy: null});
