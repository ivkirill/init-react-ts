import React, { Component, ErrorInfo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import s from './ErrorResponseBoundry.scss';

class ErrorResponseBoundry extends Component<RouteComponentProps> {
  @observable hasErrors = false;
  @observable errorMessage = '';
  error: any;

  componentDidMount() {
    // handleErrors();
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.hasErrors = true;
    this.errorMessage = error.message;
    this.error = error;
    console.error(errorInfo);

    // TODO: sens to external error service
    // sendError(error, errorInfo);
  }

  redirectToLogin = () => {
    const { history } = this.props;

    setTimeout(
    () => {
      const location = encodeURIComponent(window.location.pathname);

      if (history) {
        history.push(`/login?next=${location}`);
      }

      window.location.reload();
    },
    5000);
  }

  redirectToMain = () => {
    const { history } = this.props;

    setTimeout(
    () => {
      if (history) {
        history.push('/');
      }

      window.location.reload();
    },
    5000);
  }

  renderMessage = () => {
    const { match } = this.props;

    if (this.errorMessage.includes('Network Error')) {
      return (
        <>
          <p>Application cannot establish the connection with server.</p>
          <p>Please, check internet connection.</p>
        </>
      );
    }

    if (this.errorMessage.includes('403')) {
      this.redirectToLogin();

      return (
        <>
          <p>Authorization expired.</p>
          <p>You will be redirected to the login page in 5 seconds.</p>
        </>
      );
    }

    if (this.errorMessage.includes('404') || match.path === '*') {
      return (
        <>
          <p>Page not found</p>
          <p>You will be redirected to the main page in 5 seconds.</p>
        </>
      );
    }

    return (
      <>
        <p>We’re sorry — something’s gone wrong.</p>
        <p>Our team has been notified.</p>
        <p>You will be redirected to the main page in 5 seconds.</p>
      </>
    );
  }

  render() {
    const { match } = this.props;

    if (this.hasErrors || match && match.path === '*') {
      return (
        <div className={s.root}>
          {this.renderMessage()}
        </div>
      );
    }

    const { children } = this.props;
    return children;
  }
}
export default withRouter(observer(ErrorResponseBoundry));
