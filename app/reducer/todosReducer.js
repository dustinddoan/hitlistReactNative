import uuid from 'uuid';

// var defaultState = [
//   {_id: '123345345435', text:'workout'},
//   {_id: '1233434345435', text:'dog walk'}
// ]
var defaultState = [
  
]

module.exports = (state=defaultState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.newTodo
      ];

    case 'REMOVE_TODO':
      return state.filter((todo) => {
        if (todo._id === action.id) {
          return false;
        } else {
          return true;
        }
      });

    default:
      return state;
  }
}
