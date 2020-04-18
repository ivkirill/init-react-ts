const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATH_SRC, PATH_DIST, resolve, rules, postcss_loader } = require('./webpack.common');

module.exports = {
  resolve,
  mode: 'development',
  devtool: 'eval-source-map',
  entry: PATH_SRC,
  output: {
    publicPath: '/',
    path: PATH_DIST,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [
      ...rules,
      {
        test: /\.scss?$/,
        loader: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            }
          },
          {
            loader: 'sass-loader',
          },
          postcss_loader,
        ]
      },
    ],
  },
  devServer: {
    inline: true,
    public: 'local.io',
    historyApiFallback: true,
    port: 5012
  },
  plugins: [
    new Webpack.DefinePlugin({
      __DEV__: true,
    }),
    new HtmlWebpackPlugin({ inject: true, template: path.join(PATH_SRC, 'index.html') })
  ]
};
