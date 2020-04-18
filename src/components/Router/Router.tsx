import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes from 'routes';

import { ErrorResponseBoundry, Prefetcher, LoaderNavigate } from 'components';

export default function Router() {
  const [inProgress, startNavigate] = useState(false);

  return (
    <BrowserRouter>
      <ErrorResponseBoundry>
        <LoaderNavigate inProgress={inProgress} />
        <Prefetcher routes={routes} startNavigate={startNavigate} />
      </ErrorResponseBoundry>
    </BrowserRouter>
  );
}
