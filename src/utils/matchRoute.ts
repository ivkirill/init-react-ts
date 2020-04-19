import { matchPath } from 'react-router-dom';
import { AppRoutes, AppRoute } from 'routes';
import { Location } from 'history';
import { routeNames } from 'consts';

export function matchRoute(routes: AppRoutes, location: Location): AppRoute {
  const route = Object.keys(routes).find((name) => {
    const routeName = name as routeNames;
    const route = routes[routeName];

    const match = matchPath(location.pathname, {
      path: route.path,
      exact: route.exact,
    });

    return match && route.module && route.fetch;
  }) as routeNames;

  return routes[route];
}
