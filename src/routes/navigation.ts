import { match } from 'react-router-dom';
import { Location } from 'history';

import { ROUTES_MAIN_MENU, routeNames } from 'consts';
import { StrictDictionary } from 'interfaces';
import { routes, AppRoute } from './routes';

export interface RouteCaption extends AppRoute {
  caption?: () => string;
  isActive?: (match: match, location: Location) => boolean;
}

const captions: Partial<StrictDictionary<routeNames, Partial<RouteCaption>>> = {
  [routeNames.home]: {
    caption: () => 'Home',
  },
  [routeNames.products]: {
    caption: () => 'Products',
    isActive: (_, location: Location) => {
      const { pathname } = location;

      return pathname.includes(routeNames.products);
    },
  },
};

export const navMain = ROUTES_MAIN_MENU.map((name) => ({
  ...routes[name],
  ...captions[name],
}));
