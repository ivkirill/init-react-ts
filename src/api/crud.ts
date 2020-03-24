import { APIRequestPromise, APIQueryParams, Dictionary, ModelId } from 'interfaces';
import { api } from 'utils';

export default class CRUD {
  constructor(readonly pathname: string) {}

  list(params: APIQueryParams): APIRequestPromise {
    return api.getList(this.pathname, params);
  }

  get(id: ModelId): APIRequestPromise {
    return api.getItem(this.pathname, id);
  }

  post(body: Dictionary): APIRequestPromise {
    return api.createItem(this.pathname, body);
  }

  patch(id: ModelId, body: Dictionary): APIRequestPromise {
    return api.updateItem(this.pathname, body, id);
  }

  delete(id: ModelId): APIRequestPromise {
    return api.deleteItem(this.pathname, id);
  }
}
