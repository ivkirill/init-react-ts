import request, { AxiosInstance, AxiosPromise } from 'axios';
import {
  APIQueryParams,
  APIRequestPromise,
  APIResponse,
  APIRequestConfig,
  APIError,
  APIMethod,
  Dictionary,
  ModelId,
} from 'interfaces';

function getQuery(params: Dictionary<string> = {}): string {
  // TODO: add tests
  return Object.entries(params).flatMap(key => key.join('=')).join('&');
}

class Api {
  request: AxiosInstance;
  pending: Map<string, APIRequestPromise>;

  constructor() {
    this.request = request.create({
      timeout: 160000,
      withCredentials: true,
    });
    this.pending = new Map();
  }

  createItem(url: string, data: Dictionary, params: APIRequestConfig = {}): APIRequestPromise {
    return this.makeRequest('post', url, data, params);
  }

  getItem(url: string, id?: ModelId, params: APIQueryParams = {}): APIRequestPromise {
    return this.makeRequest(
      'get',
      `${url}${`${id}` ? `/${id}` : ''}${getQuery(params)}`,
    );
  }

  deleteItem(url: string, id: ModelId): APIRequestPromise {
    return this.makeRequest('delete', `${url}/${id}`);
  }

  getList(url: string, params:APIQueryParams = {}): APIRequestPromise {
    return this.makeRequest('get', url, { params });
  }

  makeRequest(
    method: APIMethod, url: string = '', data: Dictionary = {}, params: APIRequestConfig = {},
  ): APIRequestPromise {
    const currentQuery = [
      method,
      url,
      JSON.stringify(data),
      JSON.stringify(params),
    ].join('-');

    if (this.pending.has(currentQuery)) {
      return <APIRequestPromise>this.pending.get(currentQuery);
    }

    params.headers = { 'X-XSRFToken': '1234' }; // TODO: getCookie('_xsrf')

    const requestMethod: (url:string, data: Dictionary<string>, params: APIRequestConfig)
      => AxiosPromise = this.request[method];

    let normizedUrl = url;

    if (normizedUrl[0] !== '/') {
      normizedUrl = `/${normizedUrl}`;
    }

    const promise = requestMethod(`/-${normizedUrl}`, data, params)
      .then<any>((response: APIResponse) => {
        this.pending.delete(currentQuery);

        return response.data;
      })
      .catch((error: APIError) => {
        this.pending.delete(currentQuery);

        if (error.code === 'ECONNABORTED') {
          // TODO: Send error info to external logger
        }

        // Forward all errors to their respective owners
        throw error;
      });

    this.pending.set(currentQuery, promise);

    return promise;
  }

  post(url: string, data: Dictionary, params: APIRequestConfig = {}): APIRequestPromise {
    return this.makeRequest('post', url, data, params);
  }

  get(url: string, params: APIRequestConfig = {}): APIRequestPromise {
    return this.makeRequest('get', url, params);
  }

  updateItem(url: string, data: Dictionary, id: number | string): APIRequestPromise {
    return this.makeRequest(
      'patch',
      `${url}${id ? `/${id}` : ''}`,
      data,
      void 0,
    );
  }
}
const api = new Api();
export default api;
