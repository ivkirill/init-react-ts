import React, { PureComponent } from 'react';
import { Link } from '@components';;

import { navMain, RouteCaption } from '@routes';

import s from './Navigation.scss';

class Navigation extends PureComponent {
  render() {
    return (
      <div className={s.root}>
        {
          navMain.map((route: RouteCaption) => {
            const { path, exact, isActive, caption, module } = route;

            const key = `nav_${path}`;
            const title = caption ? caption() : module.name;

            return (
              <Link
                key={key}
                to={path}
                exact={exact}
                className={s.link}
                activeClassName={s.active}
                isActive={isActive}
              >
                {title}
              </Link>
            );
          })
        }
      </div>
    );
  }
}

export default Navigation;
