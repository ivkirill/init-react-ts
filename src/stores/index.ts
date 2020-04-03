import * as api from 'api';
import EntityStore from './base';

import {
  Product,
} from 'entities';

const stores = {
  EntityStore,

  products: new EntityStore({
    api: api.products,
    entity: Product,
  }),
};

export { EntityStore };
export default stores;
