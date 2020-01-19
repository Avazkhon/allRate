import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import customMiddleware from '../middleware';
import { isBrowser } from '../utils';

const initialState = {};
const middleware = [thunk, ...customMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
   isBrowser() ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   : compose
  )
);

export default store;
