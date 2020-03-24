const path = require('path');

const PATH_SRC = path.resolve(`${__dirname}/../src`);
const PATH_DIST = path.resolve(`${__dirname}/../dist`);

exports.PATH_SRC = PATH_SRC;
exports.PATH_DIST = PATH_DIST;

exports.resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  alias: {
    src: PATH_SRC,
    components: `${PATH_SRC}/components`,
    pages: `${PATH_SRC}/pages`,
    routes: `${PATH_SRC}/routes`,
    api: `${PATH_SRC}/api`,
    utils: `${PATH_SRC}/utils`,
    structs: `${PATH_SRC}/structs`,
    types: `${PATH_SRC}/types`,
    entities: `${PATH_SRC}/types/entities`,
    interfaces: `${PATH_SRC}/types/interfaces`,
  },
};

exports.rules = [
  {
    enforce: 'pre',
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    loader: 'tslint-loader',
  },
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

exports.optimization = {
  splitChunks: {
    automaticNameDelimiter: '.',
    cacheGroups: {
      vendor: {
        test: /[\/]node_modules[\/].*.(js|ts)x?/,
        chunks: 'initial',
        reuseExistingChunk: true,
        name: 'vendor',
        filename: 'vendor.js',
      },
    },
  },
};
