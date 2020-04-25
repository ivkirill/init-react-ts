const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const Webpack = require('webpack');

const {
  PATH_SRC, PATH_STATIC, resolve, rules, optimization, postcss_loader,
} = require('./webpack.common');

module.exports = {
  resolve,
  optimization,
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: `${PATH_SRC}/index.tsx`,
  },
  output: {
    path: PATH_STATIC,
    publicPath: '/dist/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
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
          postcss_loader,
          {
            loader: 'sass-loader',
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
    new Webpack.DefinePlugin({
      DEV: false,
    }),
  ],
};
