import { combineReducers } from 'redux';
import entities from './entities';
import gameReducer from './gameReducer';

export default combineReducers({
  entities,
  gameReducer
});
