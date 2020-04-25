import { test } from 'api';
import { Test } from 'entities';
import EntityStore from './base';


export default new EntityStore({ api: test, entity: Test });
