import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import GameHome from './containers/GameHome';

const AppRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={GameHome} />
  </Route>
);

export default AppRoutes;
