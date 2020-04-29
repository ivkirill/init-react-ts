import { products } from '@api';
import { Product } from '@entities';
import EntityStore from './base';


export default new EntityStore({ api: products, entity: Product });
