import { BaseStruct, BaseModel } from 'structs';

export type BaseStructClass = typeof BaseStruct;
export type BaseModelClass = typeof BaseModel;

export type DynamicImport = () => Promise<{ default: any }>;

export interface Dictionary<T = any> {
  [index: string]: T;
}

export type StrictDictionary<K extends string, T> = {
  [P in K]: T
};

export type ModelId = string | number;

export * from './api';
export * from './propTypes';
export * from './routes';
