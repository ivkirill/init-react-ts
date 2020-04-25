import { matchPath } from 'react-router-dom';
import { routes, AppRoute, MatchProps, AppRouteMapped } from 'routes';
import { Location } from 'history';
import { routeNames } from 'consts';

export interface MatchRoute {
  match: MatchProps;
  route: AppRoute;
}

const defaultRoute = routes[routeNames.notFound];

export function matchRoute(routesMap: AppRouteMapped[], location: Location): MatchRoute {
  let match = null;

  const matchRoute = routesMap.find((route) => {
    match = matchPath(location.pathname, {
      path: route.path,
      exact: route.exact,
    });

    return match && route.module;
  });

  return {
    match,
    route: matchRoute || defaultRoute,
  };
}
