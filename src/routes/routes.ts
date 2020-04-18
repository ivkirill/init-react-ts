import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { routeNames } from 'consts';
import { StrictDictionary } from 'interfaces';

import home from './home';
import products from './products';
import notFound from './notFound';

interface Route {
  module: () => Promise<any>;
  component?: ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  fetch?: () => Promise<any>[];
  exact?: boolean;
  path: string;
  caption?: () => string;
}

export type Routes = StrictDictionary<routeNames, Route>;

const routes: Routes = {
  // Home
  [routeNames.home]: {
    ...home,
    exact: true,
    path: '/',
    caption: () => 'Home',
  },
  // Products
  [routeNames.products]: {
    ...products,
    exact: true,
    path: '/products/',
    caption: () => 'Products',
  },

  // 404
  [routeNames.notFound]: {
    ...notFound,
    path: '*',
  },
};

// const routes = prepareRoutes(routesChunks, meta);

export { routes };
