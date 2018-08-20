import { combineReducers } from 'redux';
import * as ActionTypes from '../const/ActionTypes';

function addOneNum(state) {
  const row = state.matrix.length;
  const col = state.matrix[0].length;
  const newState1 = { ...state };
  const array = newState1.matrix.slice();
  let count = 0;
  while (count === 0) {
    const rowPosition = Math.floor(Math.random() * row);
    const colPosition = Math.floor(Math.random() * col);
    const temp = Math.random() < 0.5 ? 2 : 4;
    if (array[rowPosition][colPosition] === 0) {
      array[rowPosition][colPosition] = temp;
      newState1.newrow = rowPosition;
      newState1.newcol = colPosition;
      count++;
    }
  }
  newState1.matrix = array;
  return newState1;
}
function isGameOver(array) {
  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      if (array[row][col] === 0) {
        return false;
      } else if (col < array[row].length - 1
          && array[row][col] === array[row][col + 1]) {
        return false;
      } else if (row < array.length - 1
          && array[row][col] === array[row + 1][col]) {
        return false;
      }
    }
  }
  return true;
}
function judgCondition(newState, matrix, sum, move, addNum) {
  newState.matrix = matrix;
  newState.score = sum;
  newState.addNum = addNum;
  if (sum >= newState.best_score) {
    newState.best_score = sum;
  }
  if (newState.success === true) {
    return newState;
  }
  const over = isGameOver(matrix);
  if (over === true) {
    newState.gameState = over;
    return newState;
  }
  if (move === 0) {
    return newState;
  }
  const newState1 = addOneNum(newState);
  return newState1;
}
function Matrix(state = {
  matrix: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  score: 0, // 记录移动的相加成绩
  gameState: false, // 死亡判断的状态
  best_score: 0, // 记录最好的成绩
  success: false, // 判断是否出现2048的状态值
  newrow: 0, // 随机生成元素的位置
  newcol: 0,
  addNum: 0
}, action) {
  const col = state.matrix[0].length;
  const row = state.matrix.length;
  switch (action.type) {
    case ActionTypes.FEFRESH_DATA: { // 刷新
      const newState = { ...state };
      const array = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      newState.matrix = array;
      newState.score = 0;
      newState.gameState = false;
      const newState1 = addOneNum(addOneNum(newState));
      return newState1;
    }
    /* 法1.此处使用方法为把数组中相邻相同元素相加，
      循环将0元素与不为0的元素换位置。
      法2.可采用把所有不为0的元素抽出到新数组，
      对于相邻元素相同相加，
      对于相加后数组抽出0元素，在末尾补0，循环放回原数组。 */
    case ActionTypes.CANCUL_LEFT_NUM: { // 向左走
      const newState = { ...state };
      const matrix = state.matrix.slice();
      let sum = newState.score;
      let addNum = 0;
      let move = 0;
      matrix.map(item => {
        let index = 0;
        let i = 0;
        while (i < col && index + 1 < col) {
          if (item[i] === 0) {
            i++;
            index = i;
          } else if (item[i] !== 0) {
            if (item[i] === 2048) {
              newState.success = true;
            }
            if (item[i] !== item[index + 1]) {
              if (item[index + 1] !== 0) {
                i++;
                index = i;
              } else {
                index += 1;
              }
            } else if (item[i] === item[index + 1]) {
              item[i] += item[index + 1];
              sum += item[index + 1] * 2;
              addNum += item[index + 1] * 2;
              item[index + 1] = 0;
              i = index + 2;
              index = i;
              move++;
            }
          }
        }
        let m = 0;
        let newIndex = 0;
        while (m < col && newIndex + 1 < col) {
          if (item[m] !== 0) {
            m++;
            newIndex = m;
          } else if (item[m] === 0) {
            if (item[newIndex + 1] !== 0) {
              item[m] = item[newIndex + 1];
              item[newIndex + 1] = 0;
              m++;
              newIndex = m;
              move++;
            } else {
              newIndex += 1;
            }
          }
        }
      });
      const newState1 = judgCondition(newState, matrix, sum, move, addNum);
      return newState1;
    }
    case ActionTypes.CANCUL_RIGHT_NUM: { // 向右走
      const newState = { ...state };
      const matrix = state.matrix.slice();
      let sum = newState.score;
      let addNum = 0;
      let move = 0;
      matrix.map(item => {
        let index = row - 1;
        let i = row - 1;
        while (i > 0 && index - 1 >= 0) {
          if (item[i] === 0) {
            i--;
            index = i;
          } else if (item[i] !== 0) {
            if (item[i] === 2048) {
              newState.success = true;
            }
            if (item[i] !== item[index - 1]) {
              if (item[index - 1] !== 0) {
                i--;
                index = i;
              } else {
                index -= 1;
              }
            } else {
              item[i] += item[index - 1];
              sum += item[index - 1] * 2;
              addNum += item[index - 1] * 2;
              item[index - 1] = 0;
              i = index - 2;
              index = i;
              move++;
            }
          }
        }
        let m = row - 1;
        let newIndex = row - 1;
        while (m > 0 && newIndex - 1 >= 0) {
          if (item[m] !== 0) {
            m--;
            newIndex = m;
          } else if (item[m] === 0 && item[newIndex - 1] !== 0) {
            item[m] = item[newIndex - 1];
            item[newIndex - 1] = 0;
            m--;
            newIndex = m;
            move++;
          } else if (item[m] === 0 && item[newIndex - 1] === 0) {
            newIndex -= 1;
          }
        }
      });
      const newState1 = judgCondition(newState, matrix, sum, move, addNum);
      return newState1;
    }
    case ActionTypes.CANCUL_TOP_NUM: { // 向上走
      const newState = { ...state };
      let sum = newState.score;
      let addNum = 0;
      let move = 0;
      const matrix = newState.matrix.slice();
      for (let i = 0; i < col; i++) {
        let index = 0;
        let j = 0;
        while (j < row && index + 1 < row) {
          if (matrix[j][i] === 0) {
            j++;
            index = j;
          } else if (matrix[j][i] !== 0) {
            if (matrix[j][i] === 2048) {
              newState.success = true;
            }
            if (matrix[j][i] !== matrix[index + 1][i]) {
              if (matrix[index + 1][i] !== 0) {
                j++;
                index = j;
              } else {
                index += 1;
              }
            } else if (matrix[j][i] === matrix[index + 1][i]) {
              matrix[j][i] += matrix[index + 1][i];
              sum += matrix[index + 1][i] * 2;
              addNum += matrix[index + 1][i] * 2;
              matrix[index + 1][i] = 0;
              if (matrix[j][i] === 2048) {
                newState.success = true;
              }
              j = index + 2;
              index = j;
              move++;
            }
          }
        }
        let m = 0;
        let newIndex = 0;
        while (m < row && newIndex + 1 < row) {
          if (matrix[m][i] !== 0) {
            m++;
            newIndex = m;
          } else if (matrix[m][i] === 0) {
            if (matrix[newIndex + 1][i] !== 0) {
              matrix[m][i] = matrix[newIndex + 1][i];
              matrix[newIndex + 1][i] = 0;
              m++;
              newIndex = m;
              move++;
            } else {
              newIndex += 1;
            }
          }
        }
      }
      const newState1 = judgCondition(newState, matrix, sum, move, addNum);
      return newState1;
    }
    case ActionTypes.CANCUL_BOTTOM_NUM: { // 向下走
      const newState = { ...state };
      let sum = newState.score;
      let addNum = 0;
      let move = 0;
      const matrix = newState.matrix.slice();
      for (let i = 0; i < col; i++) {
        let index = row - 1;
        let j = row - 1;
        while (j > 0 && index - 1 >= 0) {
          if (matrix[j][i] === 0) {
            j--;
            index = j;
          } else if (matrix[j][i] !== 0) {
            if (matrix[j][i] === 2048) {
              newState.success = true;
            }
            if (matrix[j][i] !== matrix[index - 1][i]) {
              if (matrix[index - 1][i] !== 0) {
                j--;
                index = j;
              } else {
                index -= 1;
              }
            } else if (matrix[j][i] === matrix[index - 1][i]) {
              matrix[j][i] += matrix[index - 1][i];
              sum += matrix[index - 1][i] * 2;
              addNum += matrix[index - 1][i] * 2;
              matrix[index - 1][i] = 0;
              j = index - 2;
              index = j;
              move++;
            }
          }
        }
        let m = row - 1;
        let newIndex = row - 1;
        while (m > 0 && newIndex - 1 >= 0) {
          if (matrix[m][i] !== 0) {
            m--;
            newIndex = m;
          } else if (matrix[m][i] === 0) {
            if (matrix[newIndex - 1][i] !== 0) {
              matrix[m][i] = matrix[newIndex - 1][i];
              matrix[newIndex - 1][i] = 0;
              m--;
              newIndex = m;
              move++;
            } else {
              newIndex -= 1;
            }
          }
        }
      }
      const newState1 = judgCondition(newState, matrix, sum, move, addNum);
      return newState1;
    }
    default: {
      const newState = { ...state };
      const newState1 = addOneNum(addOneNum(newState));
      return newState1;
    }
  }
}

export default combineReducers({
  Matrix
});
