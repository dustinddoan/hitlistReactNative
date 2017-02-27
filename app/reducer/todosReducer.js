// var defaultState = [
//   {_id: '123345345435', text:'workout'},
//   {_id: '1233434345435', text:'dog walk'}
// ]
module.exports = (state=[], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.newTodo
      ];

    case 'SET_TODOS':
      return action.todos;

    case 'REMOVE_TODO':
      return state.filter((todo) => {
        if (todo._id === action.todo_id) {
          return false;
        } else {
          return true;
        }
      });

    default:
      return state;
  }
}
