const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, '/public/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader'
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader', // creates style nodes from JS strings
                },
                {
                    loader: 'css-loader', // translates CSS into CommonJS
                },
                {
                    loader: 'less-loader', // compiles Less to CSS
                },
            ]
        }

        ]
    },
    plugins: [
        new HWP(
            { template: path.join(__dirname, '/public/index.html') }
        )
    ]
}