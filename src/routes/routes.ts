import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { routeNames } from 'consts';
import { StrictDictionary } from 'interfaces';

import home from './home';
import products from './products';
import notFound from './notFound';

export interface AppRoute {
  module: () => Promise<any>;
  fetch?: () => Promise<any>[];
  component?: ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  exact?: boolean;
  path: string;
  caption?: () => string;
}

export type AppRoutes = StrictDictionary<routeNames, AppRoute>;

const routes: AppRoutes = {
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
