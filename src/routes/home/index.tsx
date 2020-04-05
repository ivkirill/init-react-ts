import React from 'react';
import { AsyncRoute } from 'components';
import { ProductStore } from 'stores';

const HomePage = () => import(/* webpackChunkName: 'HomePage' */ './HomePage');

export default () => {
  const fetch = [
    ProductStore.fetchList()
  ]

  return (
    <AsyncRoute resolve={HomePage} fetch={fetch} />
  )
}


