const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const Webpack = require('webpack');

const {
  PATH_SRC, PATH_STATIC, resolve, rules, optimization,
} = require('./webpack.basic');

module.exports = {
  resolve,
  optimization,
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: `${PATH_SRC}/index.tsx`,
  },
  output: {
    filename: 'app.js',
    path: PATH_STATIC,
    publicPath: '/dist/',
    chunkFilename: '[hash:5].[id].app.js',
  },
  module: {
    rules: [
      ...rules,

      {
        test: /\.(min\.css|css)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: true,
            },
          },
        ],
      },
      {
        test: /\.scss?$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: true,
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './configs/postcss.config.js',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|zh-cn/),
    new SimpleProgressWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
};
