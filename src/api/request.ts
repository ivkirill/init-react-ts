import {
  APIQueryParams,
  APIRequestPromise,
  APIRequestConfig,
  APIError,
  APIRequestParams,
  Dictionary,
  ModelId,
  APIResponse,
  APIResponseList,
} from '@interfaces';
import { API_HEADERS, API_SERVER } from '@constants';

type RequestType = 'list';

function getQuery(params: Dictionary<string> = {}): string {
  // TODO: add tests
  return Object.entries(params)
    .flatMap((key) => key.join('='))
    .join('&');
}

class API {
  instance: API;
  exists: boolean;
  pending: Map<string, APIRequestPromise<APIResponse>>;

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

  makeRequest(requestParams: APIRequestParams, type?: RequestType): APIRequestPromise<APIResponse> {
    const { method, url = '', data, config } = requestParams;

    const currentQuery = [method, url, JSON.stringify(data), JSON.stringify(config)].join('-');

    if (this.pending.has(currentQuery)) {
      return this.pending.get(currentQuery) as APIRequestPromise<APIResponse>;
    }

    const options: RequestInit = {
      method,
      headers: new Headers(API_HEADERS),
    };

    if (config) {
      options.body = JSON.stringify(config);
    }

    const promise = fetch(`${API_SERVER}${url}`, options)
      .then<APIResponse>((response) => response.json())
      .then((response: APIResponse) => {
        this.pending.delete(currentQuery);

        if (type === 'list') {
          return response.results as APIResponseList;
        }

        return response;
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
    return this.makeRequest({ method: 'post', url, data, config });
  }

  get(url: string, id?: ModelId, params: APIQueryParams = {}): APIRequestPromise {
    return this.makeRequest({ method: 'get', url: `${url}${`${id}` ? `/${id}` : ''}${getQuery(params)}` });
  }

  list(url: string, params: APIQueryParams = {}): APIRequestPromise {
    return this.makeRequest({ method: 'get', url, data: params }, 'list');
  }

  post(url: string, data: Dictionary, config: APIRequestConfig = {}): APIRequestPromise {
    return this.makeRequest({ method: 'post', url, data, config });
  }

  patch(url: string, data: Dictionary, id: ModelId): APIRequestPromise {
    return this.makeRequest({ method: 'put', url: `${url}${id ? `/${id}` : ''}`, config: data });
  }

  delete(url: string, id: ModelId): APIRequestPromise {
    return this.makeRequest({ method: 'delete', url: `${url}/${id}` });
  }
}

export default new API();
