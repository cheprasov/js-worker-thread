const path = require('path');

const configModule = {
    entry: {
        'worker-thread.js': './src/ThreadFactory.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/module/'),
        filename: '[name]',
        libraryTarget: 'commonjs2',
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

const configExample = {
    entry: {
        'dist.js': './examples/examples.js',
    },
    output: {
        path: path.resolve(__dirname, 'examples/'),
        filename: '[name]',
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


module.exports = [configModule, configExample];
