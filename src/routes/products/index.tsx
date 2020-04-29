// import React from 'react';
// import { AsyncRoute, Loader } from 'components';
import { ProductStore } from '@stores';

const ProductsPage = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: 'ProductsPage' */
  './ProductsPage');

export default {
  module: ProductsPage,
  fetch: () => [
    ProductStore.fetchList({ limit: 1 }),
  ],
};
