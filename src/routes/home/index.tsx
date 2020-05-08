// import React from 'react';
// import { AsyncRoute, Loader } from '@components';;
import { HomeStore } from '@stores';

const HomePage = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: 'HomePage' */
  './HomePage');

export default {
  module: HomePage,
  fetch: () => [
    HomeStore.fetchList(),
  ],
};
