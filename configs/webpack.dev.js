const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATH_SRC, PATH_DIST, resolve, rules } = require('./webpack.basic');

module.exports = {
  resolve,
  mode: 'development',
  devtool: 'eval-source-map',
  entry: PATH_SRC,
  output: {
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
        ]
      },
    ],
  },
  devServer: {
    inline: true,
    port: 5012
  },
  plugins: [
    new Webpack.DefinePlugin({
      __DEV__: true,
    }),
    new HtmlWebpackPlugin({ inject: true, template: path.join(PATH_SRC, 'index.html') })
  ]
};
