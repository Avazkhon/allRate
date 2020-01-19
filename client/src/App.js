import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Provider } from 'react-redux'

import store from './store/index';

import PageAuth from './container/PageAuth';

import Home from './Home';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/auth" component={PageAuth} />
    </Switch>
  </Provider>
);

export default App;
