const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  PATH_SRC, PATH_DIST, resolve, rules,
} = require('./webpack.basic');

module.exports = {
  resolve,
  mode: 'development',
  entry: PATH_SRC,
  output: {
    filename: '[name].js',
    path: PATH_DIST,
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
              modules: true,
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
    port: 8888
  },
  plugins: [
    new HtmlWebpackPlugin({ inject: true, template: path.join(PATH_SRC, 'index.html') })
  ]
};
