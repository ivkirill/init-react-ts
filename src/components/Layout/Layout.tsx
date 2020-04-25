import React, { PureComponent, ReactNode } from 'react';

import { Header, Navigation } from 'components';

import s from './Layout.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

class Layout extends PureComponent<Props> {
  render() {
    const { children } = this.props;

    return (
      <div className={s.root}>
        <div className={s.navigation}>
          <Header />

          <Navigation />
        </div>

        <div className={s.content}>
          {children}
        </div>
      </div>
    );
  }
}

export default Layout;
