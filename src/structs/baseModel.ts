import { ModelId, Dictionary } from 'interfaces';
import { BaseStruct, heap } from 'structs';

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
