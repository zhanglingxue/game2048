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
      const matrix = state.matrix.slice();
      let sum = state.score;
      const allArr = [];
      matrix.map(item => {
        const array = [];
        let index = 0;
        for (let i = 0; i < row;) {
          if (item[i] !== item[index + 1] && item[index + 1] !== 0) {
            i++;
            index = i;
          } else if (item[i] !== item[index + 1] && item[index + 1] === 0) {
            index += 1;
          } else if (item[i] === item[index + 1]) {
            item[i] += item[index + 1];
            sum += item[index + 1] * 2;
            item[index + 1] = 0;
            i = index + 2;
            index = i;
          }
        }
        item.map(idx => {
          if (idx !== 0) {
            array.push(idx); // 把除0以外的num拿出来
          }
        });
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
      const matrix = state.matrix.slice();
      let sum = state.score;
      const allArr = [];
      matrix.map(item => {
        const array = [];
        let index = row - 1;
        for (let i = row - 1; i > 0;) {
          if (item[i] !== item[index - 1] && item[index - 1] !== 0) {
            i--;
            index = i;
          } else if (item[i] !== item[index - 1] && item[index - 1] === 0) {
            index -= 1;
          } else if (item[i] === item[index - 1]) {
            item[i] += item[index - 1];
            sum += item[index - 1] * 2;
            item[index - 1] = 0;
            i = index - 2;
            index = i;
          }
        }
        item.map(idx => {
          if (idx !== 0) {
            array.push(idx); // 把除0以外的num拿出来
          }
        });
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
        let index = 0;
        let j = 0;
        while (j < row && index + 1 < row) {
          if (array[j][i] !== array[index + 1][i] && array[index + 1][i] !== 0) {
            j++;
            index = j;
          } else if (array[j][i] !== array[index + 1][i] && array[index + 1][i] === 0) {
            index += 1;
          } else if (array[j][i] === array[index + 1][i]) {
            array[j][i] += array[index + 1][i];
            sum += array[index + 1][i] * 2;
            array[index + 1][i] = 0;
            j = index + 2;
            if (j >= row) {
              break;
            }
            index = j;
          }
        }
        let m = 0;
        let newIndex = 0;
        while (m < row && newIndex + 1 < row) {
          if (array[m][i] !== 0) {
            m++;
            newIndex = m;
          } else if (array[m][i] === 0 && array[newIndex + 1][i] !== 0) {
            array[m][i] = array[newIndex + 1][i];
            array[newIndex + 1][i] = 0;
            m++;
            newIndex = m;
          } else if (array[m][i] === 0 && array[newIndex + 1][i] === 0) {
            newIndex += 1;
          }
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
        let index = row - 1;
        let j = row - 1;
        while (j > 0 && index - 1 >= 0) {
          if (array[j][i] !== array[index - 1][i] && array[index - 1][i] !== 0) {
            j--;
            index = j;
          } else if (array[j][i] !== array[index - 1][i] && array[index - 1][i] === 0) {
            index -= 1;
          } else if (array[j][i] === array[index - 1][i]) {
            array[j][i] += array[index - 1][i];
            sum += array[index - 1][i] * 2;
            array[index - 1][i] = 0;
            j = index - 2;
            if (j <= 0) {
              break;
            }
            index = j;
          }
        }
        let m = row - 1;
        let newIndex = row - 1;
        while (m > 0 && newIndex - 1 >= 0) {
          if (array[m][i] !== 0) {
            m--;
            newIndex = m;
          } else if (array[m][i] === 0 && array[newIndex - 1][i] !== 0) {
            array[m][i] = array[newIndex - 1][i];
            array[newIndex - 1][i] = 0;
            m--;
            newIndex = m;
          } else if (array[m][i] === 0 && array[newIndex - 1][i] === 0) {
            newIndex -= 1;
          }
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
