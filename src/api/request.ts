import {
  APIQueryParams,
  APIRequestPromise,
  APIResponse,
  APIRequestConfig,
  APIError,
  APIRequestParams,
  Dictionary,
  ModelId,
} from 'interfaces';
import { API_HEADERS, API_SERVER } from 'consts';

function getQuery(params: Dictionary<string> = {}): string {
  // TODO: add tests
  return Object.entries(params).flatMap(key => key.join('=')).join('&');
}

class API {
  instance: API;
  exists: boolean;
  pending: Map<string, APIRequestPromise>;

  constructor() {
    if (this.exists) {
      return this.instance;
    }

    this.instance = this;
    this.exists = true;

    // this.request = request.create({
    //   timeout: 160000,
    //   withCredentials: true,
    // });

    this.pending = new Map();
  }

  makeRequest(requestParams: APIRequestParams): APIRequestPromise<any> {
    const { method, url = '', data = {}, config = {} } = requestParams;

    const currentQuery = [
      method,
      url,
      JSON.stringify(data),
      JSON.stringify(config),
    ].join('-');

    if (this.pending.has(currentQuery)) {
      return <APIRequestPromise<APIRequestParams>>this.pending.get(currentQuery);
    }

    // url:string, data: Dictionary<string>, config: APIRequestConfig
    // let request;
    // if (method === 'post' || method === 'put' || method === 'patch') {
    //   requestMethod = (requestUrl, data, config) => this.request[method];
    // }
    // else {
    //   requestMethod = (requestUrl, config) => this.request[method];
    // }

    const promise = fetch(`${API_SERVER}${url}`, {
        method,
        headers: new Headers(API_HEADERS),
        // body: JSON.stringify(data),
      })

      .then(response => response.json())
      .then<APIRequestParams>((response: APIResponse) => {
        this.pending.delete(currentQuery);

        return response.results;
      })
      .catch((response: APIError) => {
        this.pending.delete(currentQuery);

        if (response.error === 'ECONNABORTED') {
          // TODO: Send error info to external logger
        }

        // Forward all errors to their respective owners
        throw response;
      });

    this.pending.set(currentQuery, promise);

    return promise;
  }

  create(url: string, data: Dictionary, config: APIRequestConfig = {}): APIRequestPromise {
    return this.makeRequest({ method: 'post', url: url, data: data, config: config });
  }

  get(url: string, id?: ModelId, params: APIQueryParams = {}): APIRequestPromise {
    return this.makeRequest({ method: 'get', url: `${url}${`${id}` ? `/${id}` : ''}${getQuery(params)}` });
  }

  list(url: string, params: APIQueryParams = {}): APIRequestPromise<[]> {
    return this.makeRequest({ method: 'get', url: url, data: params });
  }

  post(url: string, data: Dictionary, config: APIRequestConfig = {}): APIRequestPromise {
    return this.makeRequest({ method: 'post', url: url, data: data, config: config });
  }

  patch(url: string, data: Dictionary, id: ModelId): APIRequestPromise {
    return this.makeRequest({ method: 'patch', url: `${url}${id ? `/${id}` : ''}`, data: data });
  }

  delete(url: string, id: ModelId): APIRequestPromise {
    return this.makeRequest({ method: 'delete', url: `${url}/${id}` });
  }
}

export default new API();
