import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import serverApi from '../middleware/serverApi';
import rootReducer from '../reducers';

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, serverApi)
);

export default configureStore;
