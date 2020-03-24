import PropTypes from 'prop-types';
import { Dictionary } from 'interfaces';
import { BaseStruct } from 'structs';

export class Product extends BaseStruct {
  id: number;
  displayNamename: string;

  protected static __class: string = 'Product';

  static propTypes: Dictionary = {
    id: PropTypes.number,
    displayName: PropTypes.string,
  };
}
