import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from 'routes';

import { ErrorResponseBoundry } from 'components';

export default function Router() {
  return (
    <BrowserRouter>
      <ErrorResponseBoundry>

        <Switch>
          <Route exact component={routes.home} path="/" />

          <Route component={routes.notFound} path="*" />
        </Switch>

      </ErrorResponseBoundry>
    </BrowserRouter>
  );
}
