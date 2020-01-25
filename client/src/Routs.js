import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import PageAuth from './container/PageAuth';
import Home from './container/homePage';
import MePage from './container/mePage';

const Routs = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth" component={PageAuth} />
    <Route path="/me" component={MePage} />
  </Switch>
);

export default Routs;
