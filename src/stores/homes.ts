import { test } from 'api';
import EntityStore from './base';

import { Test } from 'entities';

export default new EntityStore({ api: test, entity: Test });
