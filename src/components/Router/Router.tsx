import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routesMap } from 'routes';

import { ErrorResponseBoundry, Prefetcher, LoaderNavigate } from 'components';

export default function Router() {
  const [inProgress, setNavigate] = useState(false);

  return (
    <BrowserRouter>
      <ErrorResponseBoundry>
        <LoaderNavigate inProgress={inProgress} />

        <Prefetcher routesMap={routesMap} setNavigate={setNavigate} />
      </ErrorResponseBoundry>
    </BrowserRouter>
  );
}
