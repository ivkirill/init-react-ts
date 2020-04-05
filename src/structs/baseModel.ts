import { ModelId, Dictionary } from 'interfaces';
import { heap } from 'stores';
import BaseStruct from './baseStruct';

export default class BaseModel extends BaseStruct {
  id: ModelId;
  model: string;
  updated?: Number;

  static getInstance(props: Dictionary): BaseModel | Dictionary {
    if (props.id != null) {
        return heap.findModel(props, this);
    }

    return this.createInstance(props);
  }
}
