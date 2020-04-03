import { BaseStruct, BaseModel } from 'structs';

export type BaseStructClass = typeof BaseStruct;
export type BaseModelClass = typeof BaseModel;

export interface Dictionary<T = any> {
  [index: string]: T;
}

export type ModelId = string | number;

export * from './api';
export * from './propTypes';
