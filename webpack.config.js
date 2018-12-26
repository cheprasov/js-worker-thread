const path = require('path');

module.exports = {
    entry: {
        'worker-thread.js': './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name]',
        //libraryTarget: 'commonjs2',
    },
    resolve: {
        alias: {
        },
    },
    module: {
        rules: [
            {
                test: /\.test\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-jest',
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
};
