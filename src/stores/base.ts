import { observable } from 'mobx';
import {
  APIResponseMeta,
  APIQueryParams,
  APIQueryListParams,
  ModelId,
  Dictionary,
  BaseModelClass,
} from 'interfaces';

import API from 'api';
import { BaseModel } from 'structs';

export default class EntityStore<T extends BaseModel> {
  protected api: API;
  protected entity: BaseModelClass;

  /**
   * Last single fetched record.
   * Is useful when it's required to fetch only one record, without accessing a list of records
   * (searching fetched record in list).
   */
  @observable item: T;

  /**
   * Fetched observable items
   *
   * @type {Dictionary<T>}
   * @memberof EntityStore
   */
  @observable items: Dictionary<T> = {};

  /**
   * Store for named arrays of fetched item ids
   *
   * @type {Dictionary<Array<ModelId>>}
   * @memberof EntityStore
   */
  @observable lists: Dictionary<Array<ModelId>> = {};

    /**
   * Fetched records metas object.
   * Contains meta information about request pagination
   *
   * @type {Dictionary<APIResponseMeta>}
   */
  @observable metas: Dictionary<APIResponseMeta> = {};

  @observable fetching: boolean = false;

  async fetchList(params: APIQueryListParams = {}): Promise<Dictionary<T>> {
    const { listName = 'all' } = params;

    this.fetching = true;

    const response = await this.api.list(params);
    const { meta, objects } = response;

    const list: Array<ModelId> = [];

    this.items = objects.reduce((items: Dictionary<T>, responseItem: T) => {
      const item = this.entity.getInstance(responseItem);
      const { id } = item;

      if (id) {
        list.push(id);

        return { ...items, ...{ [id]: item } }
      }

      return items;
    }, this.items);

    this.lists[listName] = list;
    this.metas[listName] = meta;

    this.fetching = false;

    return this.items;
  }

  async fetchItem(id: ModelId): Promise<T> {
    this.fetching = true;

    const item = <T>this.entity.getInstance(await this.api.get(id));

    this.items[id] = item;
    this.item = this.items[id];

    this.fetching = false;

    return this.item;
  }

  async update(id: ModelId, params: APIQueryParams = {}): Promise<T> {

    this.fetching = true;

    const item = <T>this.entity.getInstance(await this.api.patch(id, params));

    this.items[id] = item;
    this.item = this.items[id];

    this.fetching = false;

    return this.item;
  }
}
