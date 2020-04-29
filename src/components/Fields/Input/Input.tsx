import React from 'react';
import cn from 'classnames';
import { Field, FieldProps } from '@components';;
import { FieldInputType } from '@constants';

import s from './Input.scss';

interface Props extends FieldProps {
  type: keyof typeof FieldInputType;
}

export default function Input({ className, type, name, ...rest }: Props) {
  const classNameInput = cn(s.root, className);

  return <Field className={classNameInput} type={type} name={name} {...rest} />;
}
