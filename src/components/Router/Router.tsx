import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from 'routes';

import { ErrorResponseBoundry } from 'components';


export default function Router() {

  console.log({
    routes
  })

  return (
    <BrowserRouter>
      <ErrorResponseBoundry>

        <Switch>
          <Route exact path="/" component={routes.home} />


          {/* <Route exact component={routes.notFound} path="*" /> */}
        </Switch>

      </ErrorResponseBoundry>
    </BrowserRouter>
  );
}
