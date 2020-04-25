import React, { MouseEvent, PureComponent, ReactNode } from 'react';
import { RouteComponentProps, NavLink, withRouter, match as Match, generatePath } from 'react-router-dom';
import { Location } from 'history';
import cn from 'classnames';

import { Dictionary } from 'interfaces';

interface Props extends RouteComponentProps {
  activeClassName?: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent) => any;
  to: string;
  params?: Dictionary<string>;
  useRouter?: boolean;
  exact?: boolean;
  isActive?: (match: Match, location: Location ) => boolean;
}

/**
 * Renders link element, but for page navigation usage.
 * i.e. processes passed "to" prop, and creates page url of it
 */
class Link extends PureComponent<Props> {
  render() {
    const {
      activeClassName, children, className, onClick, to, useRouter = true, isActive, exact = true,
      match, location,
    } = this.props;

    if (useRouter) {
      const { params = {} } = this.props;
      const href = generatePath(to, params);

      return (
        <NavLink
          activeClassName={activeClassName}
          className={className}
          onClick={onClick}
          to={href}
          exact={exact}
          isActive={isActive}
        >
          {children}
        </NavLink>
      );
    }

    const isActiveATag = isActive ? isActive(match, location) : false;

    return (
      <a className={cn(className, isActiveATag && activeClassName)} href={to} onClick={onClick}>
        {children}
      </a>
    );
  }
}

export default withRouter(Link);
