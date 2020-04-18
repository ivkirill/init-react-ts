import React, { MouseEvent, PureComponent, ReactNode } from 'react';
import { RouteComponentProps, NavLink, withRouter, match } from 'react-router-dom';
import { Location } from 'history';

import cn from 'classnames';

interface Props extends RouteComponentProps {
  activeClassName?: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent) => any;
  to: string;
  useRouter?: boolean;
  isActive?: (match: match, location: Location ) => boolean;
}

/**
 * Renders link element, but for page navigation usage.
 * i.e. processes passed "to" prop, and creates page url of it
 */
class Link extends PureComponent<Props> {
  render() {
    const { activeClassName, children, className, onClick, to, useRouter = true, isActive } = this.props;
    const { match, location } = this.props;

    if (useRouter) {
      return (
        <NavLink
          activeClassName={activeClassName}
          className={className}
          onClick={onClick}
          to={to}
          exact={false}
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
