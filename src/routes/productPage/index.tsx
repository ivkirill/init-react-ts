import { ProductStore } from 'stores';
import { MatchProps } from 'routes';

const ProductPage = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: 'ProductsPage' */
    './ProductPage'
  );

export default {
  module: ProductPage,
  fetch: (match: MatchProps) => {
    const promises = [];

    if (match && match.params && match.params.id) {
      promises.push(ProductStore.fetchItem(match.params.id));
    }

    return promises;
  },
};
