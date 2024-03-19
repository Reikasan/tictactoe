const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: '/tictactoe/',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    }, 
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                        }
                    ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 100 * 1024,
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico',
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyPlugin({
            patterns: [
                { from: './site.webmanifest', to: './site.webmanifest'},
            ],
        }),
    ],
}