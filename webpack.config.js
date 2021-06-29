const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    entry: resolve(__dirname, 'src/index.js'),
    output: resolve(__dirname, 'dist')
}


module.exports = {
    mode: 'development',
    entry: PATHS.entry,
    output: {
        filename: 'main.js',
        path: PATHS.output
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'public/index.html')
        })
    ],
    devServer: {
        port: 3000,
        overlay: true,
        open: true,
        hot: true,
        historyApiFallback: true
    }
}
