import { combineReducers } from 'redux';
import * as ActionTypes from '../const/ActionTypes';

function addOneNum(state) {
  const row = state.matrix.length;
  const col = state.matrix[0].length;
  const newState1 = { ...state };
  const array1 = newState1.matrix.slice();
  let count1 = 0;
  while (count1 === 0) {
    const rowPosition1 = Math.floor(Math.random() * row);
    const colPosition1 = Math.floor(Math.random() * col);
    const temp1 = Math.random() < 0.5 ? 2 : 4;
    if (array1[rowPosition1][colPosition1] === 0) {
      array1[rowPosition1][colPosition1] = temp1;
      count1++;
    }
  }
  newState1.matrix = array1;
  return newState1;
}
function isGameOver(array) {
  for (let r = 0; r < array.length; r++) {
    for (let c = 0; c < array[r].length; c++) {
      if (array[r][c] === 0) {
        return false;
      } else if (c < array[r].length - 1
          && array[r][c] === array[r][c + 1]) {
        return false;
      } else if (r < array.length - 1
          && array[r][c] === array[r + 1][c]) {
        return false;
      }
    }
  }
  return true;
}

function Matrix(state = {
  matrix: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  score: 0,
  gameState: false,
  best_score: 0,
  success: false
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
      const newArr = addOneNum(addOneNum(newState));
      return newArr;
    }
    case ActionTypes.CANCUL_LEFT_NUM: { // 向左走
      const newState = { ...state };
      const matrix = state.matrix.slice();
      let sum = state.score;
      let gameState = state.gameState;
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
      newState.matrix = matrix;
      newState.score = sum;
      if (newState.success === true) {
        if (newState.score > newState.best_score) {
          newState.best_score = newState.score;
        }
        return newState;
      }
      const over = isGameOver(matrix);
      if (over === true) {
        gameState = over;
        newState.gameState = gameState;
        if (newState.score > newState.best_score) {
          newState.best_score = newState.score;
        }
        return newState;
      }
      if (move === 0) {
        return newState;
      }
      const newArr = addOneNum(newState);
      return newArr;
    }
    case ActionTypes.CANCUL_RIGHT_NUM: { // 向右走
      const newState = { ...state };
      const matrix = state.matrix.slice();
      let sum = state.score;
      let move = 0;
      let gameState = state.gameState;
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
      newState.matrix = matrix;
      newState.score = sum;
      if (newState.success === true) {
        if (newState.score > newState.best_score) {
          newState.best_score = newState.score;
        }
        return newState;
      }
      const over = isGameOver(matrix);
      if (over === true) {
        gameState = over;
        newState.gameState = gameState;
        if (newState.score > newState.best_score) {
          newState.best_score = newState.score;
        }
        return newState;
      }
      if (move === 0) {
        return newState;
      }
      const newArr = addOneNum(newState);
      return newArr;
    }
    case ActionTypes.CANCUL_TOP_NUM: { // 向上走
      const newState = { ...state };
      let sum = state.score;
      let move = 0;
      let gameState = state.gameState;
      const array = newState.matrix.slice();
      for (let i = 0; i < col; i++) {
        let index = 0;
        let j = 0;
        while (j < row && index + 1 < row) {
          if (array[j][i] === 0) {
            j++;
            index = j;
          } else if (array[j][i] !== 0) {
            if (array[j][i] === 2048) {
              newState.success = true;
            }
            if (array[j][i] !== array[index + 1][i]) {
              if (array[index + 1][i] !== 0) {
                j++;
                index = j;
              } else {
                index += 1;
              }
            } else if (array[j][i] === array[index + 1][i]) {
              array[j][i] += array[index + 1][i];
              sum += array[index + 1][i] * 2;
              array[index + 1][i] = 0;
              if (array[j][i] === 2048) {
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
          if (array[m][i] !== 0) {
            m++;
            newIndex = m;
          } else if (array[m][i] === 0) {
            if (array[newIndex + 1][i] !== 0) {
              array[m][i] = array[newIndex + 1][i];
              array[newIndex + 1][i] = 0;
              m++;
              newIndex = m;
              move++;
            } else {
              newIndex += 1;
            }
          }
        }
      }
      newState.matrix = array;
      newState.score = sum;
      if (newState.success === true) {
        if (newState.score > newState.best_score) {
          newState.best_score = newState.score;
        }
        return newState;
      }
      const over = isGameOver(array);
      if (over === true) {
        gameState = over;
        newState.gameState = gameState;
        if (newState.score > newState.best_score) {
          newState.best_score = newState.score;
        }
        return newState;
      }
      if (move === 0) {
        return newState;
      }
      const newArr = addOneNum(newState);
      return newArr;
    }
    case ActionTypes.CANCUL_BOTTOM_NUM: { // 向下走
      const newState = { ...state };
      let sum = state.score;
      let move = 0;
      let gameState = state.gameState;
      const array = newState.matrix.slice();
      for (let i = 0; i < col; i++) {
        let index = row - 1;
        let j = row - 1;
        while (j > 0 && index - 1 >= 0) {
          if (array[j][i] === 0) {
            j--;
            index = j;
          } else if (array[j][i] !== 0) {
            if (array[j][i] === 2048) {
              newState.success = true;
            }
            if (array[j][i] !== array[index - 1][i]) {
              if (array[index - 1][i] !== 0) {
                j--;
                index = j;
              } else {
                index -= 1;
              }
            } else if (array[j][i] === array[index - 1][i]) {
              array[j][i] += array[index - 1][i];
              sum += array[index - 1][i] * 2;
              array[index - 1][i] = 0;
              j = index - 2;
              index = j;
              move++;
            }
          }
        }
        let m = row - 1;
        let newIndex = row - 1;
        while (m > 0 && newIndex - 1 >= 0) {
          if (array[m][i] !== 0) {
            m--;
            newIndex = m;
          } else if (array[m][i] === 0) {
            if (array[newIndex - 1][i] !== 0) {
              array[m][i] = array[newIndex - 1][i];
              array[newIndex - 1][i] = 0;
              m--;
              newIndex = m;
              move++;
            } else {
              newIndex -= 1;
            }
          }
        }
      }
      newState.matrix = array;
      newState.score = sum;
      if (newState.success === true) {
        if (newState.score > newState.best_score) {
          newState.best_score = newState.score;
        }
        return newState;
      }
      const over = isGameOver(array);
      if (over === true) {
        gameState = over;
        newState.gameState = gameState;
        if (newState.score > newState.best_score) {
          newState.best_score = newState.score;
        }
        return newState;
      }
      if (move === 0) {
        return newState;
      }
      const newArr = addOneNum(newState);
      return newArr;
    }
    default: {
      const newState = { ...state };
      const newArr = addOneNum(addOneNum(newState));
      return newArr;
    }
  }
}

export default combineReducers({
  Matrix
});
