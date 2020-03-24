import { ModelProps, ModelId } from 'interfaces';
import BaseStruct from './baseStruct';
import heap from './heap';

export default class BaseModel extends BaseStruct {
  id: ModelId;

  static getInstance<T extends BaseStruct>(props: ModelProps, key: string = ''): T {
    if (props.id != null) {
      return heap.findOrCreateModel(props, this, key);
    }

    return <T>this.createInstance(props);
  }
}
