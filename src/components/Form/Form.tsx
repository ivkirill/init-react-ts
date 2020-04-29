import React, { ReactElement } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import cn from 'classnames';
import { Dictionary } from '@interfaces';

import s from './Form.scss';

interface Props {
  children: ReactElement | ReactElement[];
  onSubmit: (values: Dictionary) => void;
  initialValues?: FieldValues;
  className?: string;
}

interface FieldProps {
  type: string;
  name: string;
}

export type RegisterType = Pick<ReturnType<typeof useForm>, 'register'>;

const Form = (props: Props) => {
  const { initialValues = {}, onSubmit, children, className } = props;
  const { handleSubmit, register } = useForm({ defaultValues: initialValues });

  const classNameRoot = cn(s.root, className);
  const onFormSubmit = (values: Dictionary) => {
    return onSubmit(values);
  };

  let inputs = children;

  if (Array.isArray(children)) {
    inputs = children.map((child: ReactElement<FieldProps>) => {
      return child.props.name
        ? React.createElement(child.type, {
            ...{
              ...child.props,
              register,
              key: child.props.name,
            },
          })
        : child;
    });
  }

  return (
    <form className={classNameRoot} onSubmit={handleSubmit(onFormSubmit)}>
      {inputs}
    </form>
  );
};

export default Form;
