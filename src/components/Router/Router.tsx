import React, { useState, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routesMap } from '@routes';

import { ErrorResponseBoundry, Prefetcher, LoaderNavigate } from '@components';;

export default function Router() {
  const [inProgress, setNavigateProgress] = useState(false);
  const handleProgress = useCallback((flag) => setNavigateProgress(flag), []);


  return (
    <BrowserRouter>
      <ErrorResponseBoundry>
        <LoaderNavigate inProgress={inProgress} />

        <Prefetcher routesMap={routesMap} setProgress={handleProgress} />
      </ErrorResponseBoundry>
    </BrowserRouter>
  );
}
