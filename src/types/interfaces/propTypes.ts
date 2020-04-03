import { nominalTypeHack, Requireable, Validator } from 'prop-types';
import { Dictionary } from 'interfaces';

export interface StructValidator<T> extends Validator<T> {
  (props: Dictionary, propName: string, componentName: string, location: string, propFullName: string, secret: string): Error | null;
  [nominalTypeHack]?: {
      type: T;
  };
}

export interface StructRequireable<T> extends StructValidator<T | undefined | null> {
  isRequired: StructValidator<NonNullable<T>>;
}

export interface StructRequireable<T> extends Requireable<T> {}

export type StructPropType =
  StructRequireable<any> |
  StructRequireable<any[]> |
  StructRequireable<boolean> |
  StructRequireable<(...args: any[]) => any> |
  StructRequireable<number> |
  StructRequireable<object> |
  StructRequireable<string>;

export type StructPropTypes = Dictionary<StructPropType>;
