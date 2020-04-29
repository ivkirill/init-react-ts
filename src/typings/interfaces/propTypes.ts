import PropTypes, { ValidationMap } from 'prop-types';
import { Dictionary } from '@interfaces';

export type TypeOfPropType =
  typeof PropTypes.bool |
  typeof PropTypes.func |
  typeof PropTypes.number |
  typeof PropTypes.object |
  typeof PropTypes.string |
  typeof PropTypes.instanceOf |
  typeof PropTypes.oneOf |
  typeof PropTypes.arrayOf |
  typeof PropTypes.objectOf |
  typeof PropTypes.arrayOf |
  typeof PropTypes.any;

export type StructPropType = TypeOfPropType | ValidationMap<TypeOfPropType>;
export type StructPropTypes = Dictionary<StructPropType>;
