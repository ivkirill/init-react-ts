import React from 'react';
import cn from 'classnames';
import { Field, FieldProps } from '@components';;

import s from './Select.scss';

interface Option {
  value: string;
}

interface Props extends FieldProps {
  options: Option[];
}

export default function Input({ className, options, name, ...rest }: Props) {
  const classNameInput = cn(s.root, className);

  return (
    <Field className={classNameInput} type="select" name={name} {...rest}>
      {options.map(({ value }, i) => {
        const key = `option_${name}_${value}_${i}`;

        return (
          <option key={key} value={value}>
            {value}
          </option>
        );
      })}
    </Field>
  );
}
