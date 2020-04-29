import React from 'react';
import { Navigation } from '@components';;
import s from './NotFound.scss';

function NotFound() {
  return (
    <div className={s.content}>
      <h1>404</h1>
      <h3>page not found</h3>

      <Navigation />
    </div>
  );
}

export default NotFound;
