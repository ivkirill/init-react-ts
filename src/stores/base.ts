import { observable } from 'mobx';
import { BaseStruct } from 'structs';
import { APIResponseList, APIQueryParams, BaseStructClass, APIResponseModel, Dictionary, ModelId } from 'interfaces';
import { CRUD } from 'api';

// structs for item and list may be diffrent
interface Props {
  api: CRUD;
  itemStruct: BaseStructClass | null;
  listStruct: BaseStructClass | null;
}

export default class EntityStore<T> {
  api: CRUD;
  itemStruct: BaseStructClass | null;
  listStruct: BaseStructClass | null;

  constructor (data: Props) {
    const { api, itemStruct, listStruct } = data;

    this.api = api;
    this.itemStruct = itemStruct;
    this.listStruct = listStruct;
  }

  // TODO: move it into `Pending` store as standalone varable for each Entity
  @observable fetching: boolean = false;

  /**
   * Fetched records list object.
   * Contains meta information about request pagination and an array of objects
   *
   * @type {APIResponseList}
   */
  @observable list: APIResponseList = {
    // TODO: move it to contants
    meta: { count: 0, limit: 100, query_params: {}, next: 1, previous: null, url: null },
    objects: [],
  };

  /**
   * Single fetched record.
   * Is useful when it's required to fetch only one record, without accessing a list of records
   * (searching fetched record in list).
   * TODO:  make it link to an object from list if structs the same
   *
   * @type {BaseStruct}
   */
  @observable item: T;

  async fetchList(params: APIQueryParams = {}): Promise<Dictionary> {
    if (this.listStruct === null) {
      throw Error(`Current store has no API method for fetch LIST '${this.api.pathname}'`);
    }

    this.fetching = true;

    // TODO: use key as external prop, store varable in `listNames` store

    const response: APIResponseList = await this.api.list(params);
    const list = this.listStruct.getInstanceMap(response.objects) as APIResponseModel[];

    this.list = {
      meta: response.meta,
      objects: list,
    };

    this.fetching = false;

    return this.list;
  }

  async fetchItem(id: ModelId): Promise<BaseStruct> {
    if (this.itemStruct === null) {
      throw Error(`Current store has no API method for fetch ONE '${this.api.pathname}'`);
    }

    this.fetching = true;
    this.item = <T>this.itemStruct.getInstance(await this.api.get(id));
    this.fetching = false;

    return this.item;
  }

  async update(id: ModelId, params: APIQueryParams = {}): Promise<BaseStruct> {
    if (this.itemStruct === null) {
      throw Error(`Current store has no API method for fetch UPDATE '${this.api.pathname}'`);
    }

    this.fetching = true;
    this.item = <T>this.itemStruct.getInstance(await this.api.patch(id, params));
    this.fetching = false;

    return this.item;
  }
}
