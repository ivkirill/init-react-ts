const notFound = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: 'notFound' */
  './notFound');

export default {
  module: notFound,
};
