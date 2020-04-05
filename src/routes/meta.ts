import { routeNames } from 'consts';
import { Route, StrictDictionary } from 'interfaces';

const meta: StrictDictionary<routeNames, Route> = {
  [routeNames.home]: {
    path: '/',
    pageType: 'main-page',
    pageMeta: () => ({
      title: 'Home page',
    }),
  },

 [routeNames.list]: {
    path: '/list',
    pageType: 'list-page',
    pageMeta: () => ({
      title: 'List page',
    }),
  },

  [routeNames.notFound]: {
    path: '*',
    pageType: '404-page',
    pageMeta: () => ({
      title: '404 page',
    }),
  },
};

export { meta };
