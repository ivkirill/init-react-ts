import React, { Component, ErrorInfo } from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import s from './ErrorGlobalBoundry.scss';

class ErrorGlobalBoundry extends Component {
  @observable hasErrors = false;

  componentDidMount() {
    // handleErrors();
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.hasErrors = true;
    console.error(error, errorInfo);

    // TODO: send to external service
    // sendError(error, errorInfo);
  }

  render() {
    if (this.hasErrors) {
      return (
        <div className={s.root}>
          <p>We&rsquo;re sorry &mdash; something&rsquo;s gone wrong.</p>
          <p>Our team has been notified.</p>
        </div>
      );
    }

    const { children } = this.props;

    return children;
  }
}
export default observer(ErrorGlobalBoundry);
