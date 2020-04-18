import { test } from 'api';
import EntityStore from './base';

import { Product } from 'entities';

export default new EntityStore({ api: test, entity: Product });
