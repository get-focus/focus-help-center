const path  = require('path');
module.exports =  {
    entry: {
        back: './back-office/index',
        extension: './extension/index'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    loaders: [
        {
            test: /\.jsx?$/,
            include: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['focus']
            }
        }
    ]
};
