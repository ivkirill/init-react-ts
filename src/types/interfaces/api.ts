import { Dictionary } from 'interfaces';

export type APIRequestConfig = Partial<Request>;

export type APIError = {
  error: string;
};

export type APIRequestPromise<T = Dictionary> = Promise<T>

export type APIMethod = 'get' | 'delete' | 'post' | 'put' | 'patch';

export interface APIRequestParams {
  method: APIMethod,
  url?: string,
  data?: Dictionary,
  config?: APIRequestConfig,
}

export interface APIQueryParams extends Dictionary {
  query?: string;
  order_by?: string;
  limit?: number;
  page?: number;
}

export interface APIQueryListParams extends APIQueryParams {
  listName?: string,
}

export interface APIResponseMeta {
  count: number;
  limit: number;
  params: APIQueryParams;
  next: number | null;
  previous: string | null;
  url: string | null;
}

export type APIResponseItem = Dictionary;

export type APIResponseList = {
  results: Dictionary[];
};

export type APIResponse = APIResponseItem | APIResponseList;
