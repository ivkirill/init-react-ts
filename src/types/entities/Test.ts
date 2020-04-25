import PropTypes from 'prop-types';
import { StructPropTypes } from 'interfaces';
import { BaseModel } from 'structs';

export class Test extends BaseModel {
  objectId: string;
  displayName: string;
  updatedAt: string;
  createdAt: string;

  static propTypes: StructPropTypes = {
    objectId: PropTypes.string,
    displayName: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
  };
}

export type TestModel = typeof Test;
