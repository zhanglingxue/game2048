import { combineReducers } from 'redux';
import * as ActionTypes from '../const/ActionTypes';

function publicFunc(state) {
  const row = state.matrix.length;
  const col = state.matrix[0].length;
  let count = 0;
  while (count !== 2) {
    const rowPosition = Math.floor(Math.random() * row);
    const colPosition = Math.floor(Math.random() * col);
    const temp = Math.random() < 0.5 ? 2 : 4;
    if (state.matrix[rowPosition][colPosition] === 0) {
      state.matrix[rowPosition][colPosition] = temp;
      count++;
    }
  }
  return state;
}

function addOneNum(state) {
  const row = state.matrix.length;
  const col = state.matrix[0].length;
  const product = row * col;
  const newState1 = { ...state };
  const array1 = newState1.matrix.slice();
  let count1 = 0,
    sum = 0;
  while (count1 !== 1) {
    const rowPosition1 = Math.floor(Math.random() * row);
    const colPosition1 = Math.floor(Math.random() * col);
    const temp1 = Math.random() < 0.5 ? 2 : 4;
    if (array1[rowPosition1][colPosition1] === 0) {
      array1[rowPosition1][colPosition1] = temp1;
      count1++;
    }
    sum++;
    // 判断矩阵没有空值情况(bug)
    if (sum === product) {
      break;
    }
  }
  newState1.matrix = array1;
  return newState1;
}
function Matrix(state = {
  matrix: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
}, action) {
  const row = state.matrix[0].length;
  const col = state.matrix.length;
  switch (action.type) {
    case ActionTypes.FEFRESH_GET_DATA: { // 初始化生成矩阵
      const newState = { ...state };
      const newArr = publicFunc(newState);
      return newArr;
    }
    case ActionTypes.FEFRESH_DATA: { // 刷新
      const newState = { ...state };
      let matrix = newState.matrix.slice();
      const array = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      matrix = array;
      newState.matrix = matrix;
      const newArr = publicFunc(newState);
      return newArr;
    }
    case ActionTypes.CANCUL_LEFT_NUM: { // 向左走
      // keyCode(↑：38，←：37，→：39，↓：40)
      const newState = { ...state };
      const allArr = [];
      state.matrix.map(item => {
        const array = [];
        item.map(idx => {
          if (idx !== 0) {
            array.push(idx);
          }
        });
        for (let i = 1; i < array.length; i++) {
          if (array[i] === array[i - 1]) {
            array[i - 1] += array[i];
            array[i] = 0;
            i += 2;
          }
        }
        while (array.length < row) {
          array.push(0);
        }
        allArr.push(array);
      });
      newState.matrix = allArr;
      const newArr = addOneNum(newState);
      return newArr;
    }
    case ActionTypes.CANCUL_RIGHT_NUM: { // 向右走
      // keyCode(↑：38，←：37，→：39，↓：40)
      const newState = { ...state };
      const allArr = [];
      state.matrix.map(item => {
        const array = [];
        item.map(idx => {
          if (idx !== 0) {
            array.push(idx);
          }
        });
        for (let i = array.length - 1; i >= 0; i--) {
          if (array[i] === array[i - 1]) {
            array[i] += array[i - 1];
            array[i - 1] = 0;
            i -= 2;
          }
        }
        while (array.length < row) {
          array.unshift(0);
        }
        allArr.push(array);
      });
      newState.matrix = allArr;
      const newArr = addOneNum(newState);
      return newArr;
    }
    case ActionTypes.CANCUL_TOP_NUM: { // 向上走
      const newState = { ...state };
      const array = newState.matrix.slice();
      for (let i = 0; i < col; i++) {
        const newArr = [];
        for (let j = 0; j < row; j++) {
          if (array[j][i] !== 0) {
            newArr.push(array[j][i]);
          }
        }
        for (let i = 1; i < newArr.length; i++) {
          if (newArr[i] === newArr[i - 1]) {
            newArr[i - 1] += newArr[i];
            newArr[i] = 0;
            i += 2;
          }
        }
        while (newArr.length < col) {
          newArr.push(0);
        }
        for (let m = 0; m < newArr.length; m++) {
          array[m][i] = newArr[m];
        }
      }
      newState.matrix = array;
      const allArr = addOneNum(newState);
      console.log(allArr.matrix)
      return allArr;
    }
    case ActionTypes.CANCUL_BOTTOM_NUM: { // 向下走
      const newState = { ...state };
      const array = newState.matrix.slice();
      for (let i = 0; i < col; i++) {
        const newArr = [];
        for (let j = row - 1; j >= 0; j--) {
          if (array[j][i] !== 0) {
            newArr.unshift(array[j][i]);
          }
        }
        for (let k = newArr.length - 1; k > 0; k--) {
          if (newArr[k] === newArr[k - 1]) {
            newArr[k] += newArr[k - 1];
            newArr[k - 1] = 0;
            k -= 2;
          }
        }
        while (newArr.length < col) {
          newArr.unshift(0);
        }
        for (let m = 0; m < newArr.length; m++) {
          array[m][i] = newArr[m];
        }
      }
      newState.matrix = array;
      const allArr = addOneNum(newState);
      return allArr;
    }
    default:
      return state;
  }
}

export default combineReducers({
  Matrix
});
