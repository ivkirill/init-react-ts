import React, { PureComponent } from 'react';
import { Provider } from 'mobx-react';

import stores from 'stores';

import {
  Router,
  ErrorGlobalBoundry,
} from 'components';

import s from './App.scss';

class App extends PureComponent {
  render() {
    return (
      <Provider {...stores}>
        <ErrorGlobalBoundry>
          <div className={s.root}>
            <Router />
          </div>
        </ErrorGlobalBoundry>
      </Provider>
    );
  }
}

export default App;
