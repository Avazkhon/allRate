import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'

import store from './store/index';

import Routs from './Routs';

const App = () => (
  <Provider store={store}>
    <Routs />
  </Provider>
);

export default App;
