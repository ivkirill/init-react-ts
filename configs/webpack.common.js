const path = require('path');

const PATH_SRC = path.resolve(`${__dirname}/../src`);
const PATH_DIST = path.resolve(`${__dirname}/../dist`);

exports.PATH_SRC = PATH_SRC;
exports.PATH_DIST = PATH_DIST;

exports.resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  alias: {
    '@src': PATH_SRC,
    '@components': `${PATH_SRC}/components/`,
    '@pages': `${PATH_SRC}/pages/`,
    '@routes': `${PATH_SRC}/routes/`,
    '@api': `${PATH_SRC}/api/`,
    '@utils': `${PATH_SRC}/utils/`,
    '@structs': `${PATH_SRC}/structs/`,
    '@constants': `${PATH_SRC}/constants/`,
    '@stores': `${PATH_SRC}/stores/`,
    '@typings': `${PATH_SRC}/typings/`,
    '@entities': `${PATH_SRC}/typings/entities/`,
    '@interfaces': `${PATH_SRC}/typings/interfaces/`,
  },
};

exports.rules = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    rules: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  {
    enforce: 'pre',
    test: /\.js$/,
    exclude: /(node_modules)/,
    loader: 'source-map-loader',
  },
  {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
];

exports.postcss_loader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: './configs/postcss.config.js',
    },
  },
}
