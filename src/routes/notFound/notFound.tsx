import React, { Component } from 'react';
import s from './notFound.scss';
import { Navigation } from 'components';

class notFound extends Component {
  render() {
    return (
      <div className={s.content}>
        <h1>404</h1>
        <h3>page not found</h3>

        <Navigation />
      </div>
    );
  }
}

export default notFound;
