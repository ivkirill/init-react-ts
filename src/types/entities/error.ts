import PropTypes from 'prop-types';
import { Dictionary } from 'interfaces';
import { BaseStruct } from 'structs';

export class Error extends BaseStruct {
  reason: string; // reason @0
  status_code: number; // statusCode @1

  protected static __class: string = 'Error';

  static propTypes: Dictionary = {
    reason: PropTypes.string,
    status_code: PropTypes.number,
  };
}

export class FieldError extends BaseStruct {
  reason: string; // reason @0
  field: string; // field @1

  protected static __class: string = 'FieldError';

  static propTypes: Dictionary = {
    reason: PropTypes.string,
    field: PropTypes.string,
  };
}

export class CommonError extends BaseStruct {
  reason: string; // reason @0
  status_code: number; // statusCode @1
  type: string; // type @2
  message: string; // message @3

  protected static __class: string = 'CommonError';

  static propTypes: Dictionary = {
    reason: PropTypes.string,
    status_code: PropTypes.number,
    type: PropTypes.string,
    message: PropTypes.string,
  };
}

export class ErrorResponse extends BaseStruct {
  status_code: number; // statusCode @0
  field_errors?: FieldError[]; // fieldErrors @1
  error?: CommonError; // error @2

  protected static __class: string = 'ErrorResponse';

  static propTypes: Dictionary = {
    status_code: PropTypes.number,
    field_errors: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.object,
  };

  static objectTypes: Dictionary = {
    field_errors: FieldError,
    error: CommonError,
  };
}
