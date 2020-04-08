import { FunctionComponent } from 'react';
import { routeNames } from 'consts';
import { StrictDictionary } from 'interfaces';

import home from './home';
// import notFound from './home';

const routes: StrictDictionary<routeNames, FunctionComponent> = {
  // Home
  [routeNames.home]: home,
  // List
  [routeNames.list]: home,
  // 404
  [routeNames.notFound]: home,
};

// const routes = prepareRoutes(routesChunks, meta);

export { routes };
