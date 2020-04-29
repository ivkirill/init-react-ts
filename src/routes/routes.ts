import { ComponentType } from 'react';
import { RouteComponentProps, match } from 'react-router-dom';

import { routeNames } from '@constants';
import { StrictDictionary, Dictionary } from '@interfaces';

import home from './home';
import products from './products';
import product from './productPage';
import notFound from './notFound';

export type MatchProps = match<Dictionary> | null;

export interface AppRoute {
  module: () => Promise<any>;
  fetch?: (match: MatchProps) => Promise<any>[];
  component?: ComponentType<RouteComponentProps>;
  exact?: boolean;
  path: string;
}

export interface AppRouteMapped extends AppRoute {
  id: routeNames;
}

export type AppRoutes = StrictDictionary<routeNames, AppRoute>;

const routes: AppRoutes = {
  // Home
  [routeNames.home]: {
    path: '/',
    exact: true,
    ...home,
  },

  // Product Page
  [routeNames.product]: {
    path: '/products/:id',
    exact: true,
    ...product,
  },

  // Products
  [routeNames.products]: {
    path: '/products/',
    exact: true,
    ...products,
  },

  // 404
  [routeNames.notFound]: {
    path: '*',
    ...notFound,
  },
};

const routesMap: AppRouteMapped[] = Object.values(routeNames).map(id => ({ ...routes[id], id }));

export { routes, routesMap };
