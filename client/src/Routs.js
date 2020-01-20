import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import PageAuth from './container/PageAuth';
import Home from './container/homePage';

const Routs = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth" component={PageAuth} />
  </Switch>
);

export default Routs;
