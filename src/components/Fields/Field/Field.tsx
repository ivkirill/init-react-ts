import React, { ReactElement } from 'react';
import { RegisterType } from 'components';
import { FieldType, FieldInputType } from '@constants';

export interface FieldProps {
  name: string;
  className?: string;
  required?: boolean;
}

interface Props extends FieldProps {
  type: keyof typeof FieldType | keyof typeof FieldInputType;
  register?: RegisterType;
  children?: ReactElement | ReactElement[];
}

const Field = ({ name, type, className, register, children, ...rest }: Props) => {
  let component;

  switch (type) {
    case 'select':
      component = 'select';
      break;
    case 'textarea':
      component = 'textarea';
      break;
    case 'number':
    case 'text':
    default:
      component = 'input';
  }

  return React.createElement(
    component,
    {
      name,
      className,
      ref: register,
      ...rest,
    },
    children
  );
};

export default Field;
