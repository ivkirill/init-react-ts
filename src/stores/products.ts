import { products } from 'api';
import EntityStore from './base';

import { Product } from 'entities';

export default new EntityStore({ api: products, entity: Product });
