import { Dictionary, ModelProps } from '.';

export {
  AxiosResponse as APIResponse,
  AxiosRequestConfig as APIRequestConfig,
  AxiosError as APIError,
} from 'axios';

export interface APIRequestPromise extends Promise<any>{}

export type APIMethod = 'get' | 'delete' | 'post' | 'put' | 'patch';

export interface APIQueryParams extends Dictionary {
  query?: string;
  order_by?: string;
  limit?: number;
  page?: number;
}

export interface APIResponseMeta {
  count: number;
  limit: number;
  query_params: APIQueryParams;
  next: number | null;
  previous: string | null;
  url: string | null;
}

export interface APIResponseModel extends ModelProps {
  model: string;
}

export interface APIResponseList {
  meta: APIResponseMeta;
  objects: APIResponseModel[];
}
