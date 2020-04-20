import EntityStore from './base';

import ProductStore from './products';
import HomeStore from './homes';

const stores = {
  HomeStore,
  ProductStore,
};

export {
  stores,
  HomeStore,
  ProductStore,
  EntityStore,
};

export default stores;
