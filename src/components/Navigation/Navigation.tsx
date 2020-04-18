import React, { PureComponent } from 'react';
import { Link } from 'components';

import { navMain } from 'routes';

import s from './Navigation.scss';

class Navigation extends PureComponent {
  render() {
    return (
      <div className={s.root}>
        {
          navMain.map((item) => {
            const key = `nav_${item.path}`;
            const caption = (item.caption || (() => ''))();

            return (
              <Link key={key} to={item.path}>{`${caption}`}</Link>
            );
          })
        }
      </div>
    );
  }
}

export default Navigation;
