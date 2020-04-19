import PropTypes from 'prop-types';
import { StructPropTypes } from 'interfaces';
import { BaseModel } from 'structs';

export class Test extends BaseModel {
  objectId: string;
  Name: string;
  updatedAt: string;
  createdAt: string;

  static propTypes: StructPropTypes = {
    objectId: PropTypes.string,
    Name: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
  };
}
