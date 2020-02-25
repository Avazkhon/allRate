import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './container/homePage';
import PageAuth from './container/PageAuth';
import MePage from './container/mePage';
import CreateRatePage from './container/CreateRatePage';
import CreateRatesList from './container/CreateRatesList';
import CardRate from './container/CardRate';
import RateList from './container/RateList';

const Routs = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth" component={PageAuth} />
    <Route path="/me" component={MePage} />
    <Route path="/create-rate" component={CreateRatePage} />
    <Route path="/create-rates-list" component={CreateRatesList} />
    <Route path="/card-rate/:id" component={CardRate} />
    <Route path="/rate-list" component={RateList} />
  </Switch>
);

export default Routs;
