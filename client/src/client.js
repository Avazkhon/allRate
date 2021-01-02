import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import { ThemeProvider } from '@material-ui/core/styles';

import {
  JssProvider,
  SheetsRegistry,
} from 'react-jss'

import routes from 'routes';
import history from 'store/routerHistory';

import theme from './theme';

/* eslint-disable no-underscore-dangle */
const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */
const store = configureStore(preloadedState);
const sheets = new SheetsRegistry()

ensureReady(routes).then((data) => {
  // что то с этим не корректно работает стили удаляя нужные стили для ссылкок
  // const ssStyles = document.getElementById('server-side-styles');
  // if (ssStyles && ssStyles.parentNode) {
  //   ssStyles.parentNode.removeChild(ssStyles);
  // }
  const jssStyles = document.querySelector('#jss-server-side');
  if (jssStyles) {
    jssStyles.parentElement.removeChild(jssStyles);
  }

  return hydrate(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <JssProvider
          registry={sheets}
          id={process.env.RAZZLE_APP_MINIMIZE_CLASSES && {minify: true}}
        >
          <Router history={history}>
            <After data={data} routes={routes} />
          </Router>
        </JssProvider>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
  )}
);


if (module.hot) {
  module.hot.accept();
}
