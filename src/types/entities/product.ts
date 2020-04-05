import PropTypes, {  } from 'prop-types';
import { StructPropTypes } from 'interfaces';
import { BaseModel } from 'structs';

export class Product extends BaseModel {
  id: number;
  model: 'Product';
  displayName: string;

  static propTypes: StructPropTypes = {
    id: PropTypes.number,
    displayName: PropTypes.string,
  };
}
