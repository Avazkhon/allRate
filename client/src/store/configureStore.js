import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createApiMiddleware from 'middleware/api';

import rootReducer from 'reducers';
import { isBrowser } from 'utils';

const configureStore = (preloadedState, req) => {

  const middleware = [
    createApiMiddleware(req),
    thunkMiddleware,
  ];

  let createStoreWithMiddleware;

  if (isBrowser()) {
    const composeEnhancers = (
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && // eslint-disable-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line no-underscore-dangle
        name: 'razzle-after-redux-devtools',
        maxAge: 200,
        latency: 500,
        serialize: {
          options: undefined
        }
      })
    ) || compose;

    createStoreWithMiddleware = composeEnhancers(
      applyMiddleware(...middleware))(createStore);
  } else {
    createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  }

  return createStoreWithMiddleware(rootReducer, preloadedState);
};

export default configureStore;
