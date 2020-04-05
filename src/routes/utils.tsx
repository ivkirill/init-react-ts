import React from 'react';

export function prepareRoutes(routes: any, meta: any): any {
  return  Object.keys(routes).reduce((list: any, name) => {

    list[name] = {
      ...meta[name],
      component: (
        <React.Suspense fallback={<div>Loading...</div>}>
          { React.lazy(routes[name]) }
        </React.Suspense>
      )
    }

    return list;

  }, {});
}

