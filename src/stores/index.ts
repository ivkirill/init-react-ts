import EntityStore from './base';

import ProductStore from './products';
import HomeStore from './homes';

const stores = {
  HomeStore,
  EntityStore,
  ProductStore,
};

export {
  stores,
  HomeStore,
  ProductStore,
};

export default stores;
