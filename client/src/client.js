import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';

import routes from 'routes';
import history from 'store/routerHistory';

const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

ensureReady(routes).then((data) => {
  const ssStyles = document.getElementById('server-side-styles');
  if (ssStyles && ssStyles.parentNode) {
    ssStyles.parentNode.removeChild(ssStyles);
  }
  return hydrate(
    <Provider store={store}>
      <Router history={history}>
        <After data={data} routes={routes} />
      </Router>
    </Provider>,
    document.getElementById('root'),
  )}
);


if (module.hot) {
  module.hot.accept();
}
