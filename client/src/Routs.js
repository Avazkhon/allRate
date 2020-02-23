import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import Home from './container/homePage';
import PageAuth from './container/PageAuth';
import MePage from './container/mePage';
import createRatePage from './container/createRatePage';
import CreateRatesList from './container/CreateRatesList';

const Routs = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth" component={PageAuth} />
    <Route path="/me" component={MePage} />
    <Route path="/create-rate" component={createRatePage} />
    <Route path="/create-rates-list" component={CreateRatesList} />
  </Switch>
);

export default Routs;
