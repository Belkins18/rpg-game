const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;

console.log('NODE_ENV: ', NODE_ENV);

const PATHS = {
  entry: resolve(__dirname, 'src/index.js'),
  output: NODE_ENV === 'production'
    ? resolve(__dirname, 'build')
    : resolve(__dirname, 'dist'),
};

module.exports = {
  mode: NODE_ENV || 'development',
  entry: PATHS.entry,
  output: {
    filename: 'main.js',
    path: PATHS.output,
  },
  watch: NODE_ENV === 'development',
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: [/\.svg$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html'),
    }),
  ],
  devServer: {
    port: 3000,
    overlay: true,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : false,
};
