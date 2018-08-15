
const init_state = {
  line: 4,
  col: 4,
  array: []
};

export default function todoList(state = init_state, action) {
  switch (action.type) {
    default: {
      const linePosition = Math.floor(Math.random() * state.line);
      const colPosition = Math.floor(Math.random() * state.col);
      
      return state;
    }
  }
}
