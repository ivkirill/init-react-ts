import PropTypes, {  } from 'prop-types';
import { StructPropTypes } from 'interfaces';
import { BaseStruct } from 'structs';

export class Product extends BaseStruct {
  id: number;
  model: 'Product';
  displayName: string;

  static propTypes: StructPropTypes = {
    id: PropTypes.number,
    displayName: PropTypes.string,
  };
}
