import React, { memo } from 'react';

interface Props {
  text?: string;
}

const Loader = ({ text }: Props) => {
  return (
    <div>
      {`Loading ${text}`}
    </div>
  );
};

export default memo(Loader);
