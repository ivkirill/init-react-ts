import { ModelId } from '@interfaces';
import BaseStruct from './baseStruct';

export default class BaseModel extends BaseStruct {
  static objectId: ModelId;

  static getStructInstance<T extends BaseModel>(props: T): BaseModel {
    return this.createInstance(props);
  }
}
