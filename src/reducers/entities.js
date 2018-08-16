import { combineReducers } from 'redux';
import * as ActionTypes from '../const/ActionTypes';

function publicFunc(array) {
  const row = array.length;
  const col = array[0].length;
  let count = 0;
  while (count !== 2) {
    const rowPosition = Math.floor(Math.random() * row);
    const colPosition = Math.floor(Math.random() * col);
    const temp = Math.random() < 0.5 ? 2 : 4;
    const data = array[rowPosition][colPosition];
    if (data === 0) {
      array[rowPosition][colPosition] = temp;
      count++;
    }
  }
  return array;
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
  ],
  score: 0
}, action) {
  const row = state.matrix[0].length;
  const col = state.matrix.length;
  switch (action.type) {
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
      const copeMatrix = matrix.slice();
      const newMatrix = publicFunc(copeMatrix);
      newState.matrix = newMatrix;
      return newState;
    }
    case ActionTypes.CANCUL_LEFT_NUM: { // 向左走
      // keyCode(↑：38，←：37，→：39，↓：40)
      const newState = { ...state };
      let sum = state.score;
      const allArr = [];
      state.matrix.map(item => {
        const array = [];
        item.map(idx => {
          if (idx !== 0) {
            array.push(idx); // 把除0以外的num拿出来
          }
        });
        for (let i = 1; i < array.length; i++) { // 计算相同num
          if (array[i] === array[i - 1]) {
            array[i - 1] += array[i];
            sum += array[i] * 2;
            array[i] = 0;
            i += 2;
          }
        }
        for (let i = 0; i < array.length; i++) { // 计算后去除0位，即0与后一位元素换位
          if (array[i] === 0 && (i !== array.length - 1)) {
            array[i] = array[i + 1];
            array[i + 1] = 0;
          }
        }
        while (array.length < row) {
          array.push(0);
        }
        allArr.push(array);
      });
      newState.matrix = allArr;
      newState.score = sum;
      const newArr = addOneNum(newState);
      return newArr;
    }
    case ActionTypes.CANCUL_RIGHT_NUM: { // 向右走
      const newState = { ...state };
      let sum = state.score;
      const allArr = [];
      state.matrix.map(item => {
        const array = [];
        item.map(idx => {
          if (idx !== 0) {
            array.push(idx);
          }
        });
        for (let i = array.length - 1; i > 0; i--) {
          if (array[i] === array[i - 1]) {
            array[i] += array[i - 1];
            sum += array[i - 1] * 2;
            array[i - 1] = 0;
            i -= 2;
          }
        }
        for (let i = array.length - 1; i > 0; i--) {
          if (array[i] === 0) {
            array[i] = array[i - 1];
            array[i - 1] = 0;
          }
        }
        while (array.length < row) {
          array.unshift(0);
        }
        allArr.push(array);
      });
      newState.matrix = allArr;
      newState.score = sum;
      const newArr = addOneNum(newState);
      return newArr;
    }
    case ActionTypes.CANCUL_TOP_NUM: { // 向上走
      const newState = { ...state };
      let sum = state.score;
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
            sum += newArr[i] * 2;
            newArr[i] = 0;
            i += 2;
          }
        }
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i] === 0 && (i !== newArr.length - 1)) {
            newArr[i] = newArr[i + 1];
            newArr[i + 1] = 0;
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
      newState.score = sum;
      const allArr = addOneNum(newState);
      return allArr;
    }
    case ActionTypes.CANCUL_BOTTOM_NUM: { // 向下走
      const newState = { ...state };
      let sum = state.score;
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
            sum += newArr[k - 1] * 2;
            newArr[k - 1] = 0;
            k -= 2;
          }
        }
        for (let m = newArr.length - 1; m > 0; m--) {
          if (newArr[m] === 0) {
            newArr[m] = array[m - 1];
            newArr[m - 1] = 0;
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
      newState.score = sum;
      const allArr = addOneNum(newState);
      return allArr;
    }
    default: {
      const newState = { ...state };
      const matrix = state.matrix.slice();
      const newMatrix = publicFunc(matrix);
      newState.matrix = newMatrix;
      return newState;
    }
  }
}

export default combineReducers({
  Matrix
});
