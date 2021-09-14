import React from 'react';

import { Route, Switch } from 'react-router-dom';

import PostsDiscovery from './pages/PostsDiscovery';
import PostDetails from './pages/PostDetails';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={PostsDiscovery} />
      <Route path="/post/:id" component={PostDetails} />
    </Switch>
  );
}

export default Routes;
