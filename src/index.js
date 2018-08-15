import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import AppRoutes from './routes';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {AppRoutes()}
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
