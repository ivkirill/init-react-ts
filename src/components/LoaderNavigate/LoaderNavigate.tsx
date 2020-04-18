import React from 'react';
import cn from 'classnames';

import s from './LoaderNavigate.scss';

interface Props {
  inProgress: boolean;
}

export default function LoaderNavigate(props: Props) {
  const { inProgress } = props;
  const className = cn(s.root, { [s.progress]: inProgress });

  return <div className={className} />;
}
