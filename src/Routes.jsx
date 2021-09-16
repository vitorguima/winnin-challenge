import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import PostsDiscovery from './pages/PostsDiscovery';

function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/hot" />
      <Route exact path="/new" component={ PostsDiscovery } />
      <Route exact path="/rising" component={ PostsDiscovery } />
      <Route exact path="/hot" component={ PostsDiscovery } />
    </Switch>
  );
}

export default Routes;
