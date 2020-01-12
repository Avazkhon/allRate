import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import PageAuth from './container/PageAuth';

import Home from './Home';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth" component={PageAuth} />
  </Switch>
);

export default App;
