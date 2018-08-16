import * as ActionTypes from '../const/ActionTypes';

function fetchResart() {
  return {
    type: ActionTypes.FEFRESH_DATA
  };
}
function fetchGetData() {
  return {
    type: ActionTypes.FEFRESH_GET_DATA
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

function fetchKeyCodeNum(keycode) {
  switch (keycode) {
    case 37: {
      return {
        type: ActionTypes.CANCUL_LEFT_NUM
      };
    }
    default: {
      break;
    }
  }
}
export {
  fetchResart,
  fetchGetData,
  fetchCanculNum,
  fetchRightCanculNum,
  fetchTopCanculNum,
  fetchBottomCanculNum,
  fetchKeyCodeNum
};
