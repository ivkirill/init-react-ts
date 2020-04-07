import { APIRequestPromise, APIQueryParams, Dictionary, ModelId } from 'interfaces';
import { request } from 'api';

export default class API {
  constructor(readonly pathname: string) {}

  list(params?: APIQueryParams): APIRequestPromise<[]> {
    return request.list(this.pathname, params);
  }

  get(id: ModelId): APIRequestPromise {
    return request.get(this.pathname, id);
  }

  post(body: Dictionary): APIRequestPromise {
    return request.create(this.pathname, body);
  }

  patch(id: ModelId, body: Dictionary): APIRequestPromise {
    return request.patch(this.pathname, body, id);
  }

  delete(id: ModelId): APIRequestPromise {
    return request.delete(this.pathname, id);
  }
}
