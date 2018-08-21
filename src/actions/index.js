import * as ActionTypes from '../const/ActionTypes';

function fetchResart() {
  return {
    type: ActionTypes.FEFRESH_DATA
  };
}
function fetchCanculNum() {
  return {
    type: ActionTypes.CANCUL_LEFT_NUM
  };
}
function fetchRightCanculNum() {
  return {
    type: ActionTypes.CANCUL_RIGHT_NUM
  };
}

function fetchTopCanculNum() {
  return {
    type: ActionTypes.CANCUL_TOP_NUM
  };
}

function fetchBottomCanculNum() {
  return {
    type: ActionTypes.CANCUL_BOTTOM_NUM
  };
}
function fetchGetGameState() {
  return {
    type: ActionTypes.GET_GAME_STATE
  };
}

export {
  fetchResart,
  fetchCanculNum,
  fetchRightCanculNum,
  fetchTopCanculNum,
  fetchBottomCanculNum,
  fetchGetGameState
};
