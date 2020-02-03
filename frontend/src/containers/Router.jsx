import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './home/HomePage';

const Router = () => (
  <Switch>
    <Route path="/" component={HomePage} />
  </Switch>
);

export default Router;
