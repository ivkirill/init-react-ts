import PropTypes from 'prop-types';
import { Dictionary } from 'interfaces';
import { BaseStruct } from 'structs';

export class Error extends BaseStruct {
  reason: string; // reason @0
  statusCode: number; // statusCode @1

  protected static __class = 'Error';

  static propTypes: Dictionary = {
    reason: PropTypes.string,
    statusCode: PropTypes.number,
  };
}

export class FieldError extends BaseStruct {
  reason: string; // reason @0
  field: string; // field @1

  protected static __class = 'FieldError';

  static propTypes: Dictionary = {
    reason: PropTypes.string,
    field: PropTypes.string,
  };
}

export class CommonError extends BaseStruct {
  reason: string; // reason @0
  statusCode: number; // statusCode @1
  type: string; // type @2
  message: string; // message @3

  protected static __class = 'CommonError';

  static propTypes: Dictionary = {
    reason: PropTypes.string,
    statusCode: PropTypes.number,
    type: PropTypes.string,
    message: PropTypes.string,
  };
}

export class ErrorResponse extends BaseStruct {
  statusCode: number; // statusCode @0
  fieldErrors?: FieldError[]; // fieldErrors @1
  error?: CommonError; // error @2

  protected static __class = 'ErrorResponse';

  static propTypes: Dictionary = {
    statusCode: PropTypes.number,
    fieldErrors: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.object,
  };

  static objectTypes: Dictionary = {
    fieldErrors: FieldError,
    error: CommonError,
  };
}
