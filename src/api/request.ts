import request, { AxiosInstance, AxiosPromise } from 'axios';
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

function getQuery(params: Dictionary<string> = {}): string {
  // TODO: add tests
  return Object.entries(params).flatMap(key => key.join('=')).join('&');
}

class API {
  instance: API;
  exists: boolean;
  request: AxiosInstance;
  pending: Map<string, APIRequestPromise>;

  constructor() {
    // if (this.exists) {
    //   return this.instance;
    // }

    // this.instance = this;
    // this.exists = true;

    this.request = request.create({
      timeout: 160000,
      withCredentials: true,
    });

    this.pending = new Map();
  }

  makeRequest(requestParams: APIRequestParams): APIRequestPromise<APIRequestParams> {
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

    config.headers = { 'X-XSRFToken': '1234' }; // TODO: getCookie('_xsrf')

    const requestMethod: (url:string, data: Dictionary<string>, config: APIRequestConfig)
      => AxiosPromise = this.request[method];

    let normizedUrl = url;

    if (normizedUrl[0] !== '/') {
      normizedUrl = `/${normizedUrl}`;
    }

    const promise = requestMethod(`/-${normizedUrl}`, data, config)
      .then<APIRequestParams>((response: APIResponse) => {
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

  create(url: string, data: Dictionary, config: APIRequestConfig = {}): APIRequestPromise {
    return this.makeRequest({ method: 'post', url, data, config });
  }

  get(url: string, id?: ModelId, params: APIQueryParams = {}): APIRequestPromise {
    return this.makeRequest({ method: 'get', url: `${url}${`${id}` ? `/${id}` : ''}${getQuery(params)}` });
  }

  list(url: string, params: APIQueryParams = {}): APIRequestPromise {
    return this.makeRequest({ method: 'get', url, config: { params } });
  }

  post(url: string, data: Dictionary, config: APIRequestConfig = {}): APIRequestPromise {
    return this.makeRequest({ method: 'post', url, data, config });
  }

  patch(url: string, data: Dictionary, id: ModelId): APIRequestPromise {
    return this.makeRequest({ method: 'patch', url: `${url}${id ? `/${id}` : ''}`, data });
  }

  delete(url: string, id: ModelId): APIRequestPromise {
    return this.makeRequest({ method: 'delete', url: `${url}/${id}` });
  }
}

export default new API();
