import axios from 'axios';
import Keychain from 'react-native-keychain';

import {TODOS_URL, TODO_URL} from '../api';
import {addAlert} from './alertsActions';
import {AsyncStorage} from 'react-native'


const storageUserId = '@Todo:user_id'
const storageToken = '@Todo:token'

exports.createTodo = (text) => {
  return function(dispatch) {
    return AsyncStorage.multiGet([storageUserId, storageToken], (err, stores) => {

        // console.log(stores);
        // console.log(stores[0][1]);
        // console.log(stores[1][1]);
        let user_id = stores[0][1]
        let password = stores[1][1]
        console.log('username: ', user_id);
        console.log('password: ', password);
        return axios.post(TODOS_URL(user_id), {text}, {
          headers: {authorization: password}
        }).then((response) => {
          console.log('response: ', response.data.todo);
          dispatch(addTodo(response.data.todo))
        }).catch((err) => {
          console.log(err);
        })

    })
  }
}
exports.deleteTodo = (todo_id) => {
  return function(dispatch) {
    return AsyncStorage.multiGet([storageUserId, storageToken], (err, stores) => {

        // console.log(stores);
        // console.log(stores[0][1]);
        // console.log(stores[1][1]);
        let user_id = stores[0][1]
        let password = stores[1][1]
        // console.log('username: ', username);
        // console.log('password: ', password);
        return axios.delete(TODO_URL(user_id, todo_id), {
          headers: {authorization: password}
        }).then((response) => {
          // console.log('response: ', response.data.todo);
          dispatch(removeTodo(todo_id))
        }).catch((err) => {
          console.log(err);
          dispatch(addAlert("Couldn't delete todo."));
        })

    })
  }
}
exports.getTodos = function(dispatch) {
    return AsyncStorage.multiGet([storageUserId, storageToken], (err, stores) => {

        // console.log(stores);
        // console.log(stores[0][1]);
        // console.log(stores[1][1]);
        let username = stores[0][1]
        let password = stores[1][1]
        console.log('username: ', username);
        console.log('password: ', password);
        return axios.get(TODOS_URL(username), {
          headers: {authorization: password}
        }).then((response) => {
          console.log('response: ', response.data.todos);
          dispatch(setTodos(response.data.todos))
        }).catch((err) => {
          console.log(err);
        })

    })
  }


// exports.createTodo = (text) => {
//   return function(dispatch) {
//     return Keychain.getGenericPassword().then((credentials) => {
//       var {username, password} = credentials;
//       return axios.post(TODOS_URL(username), {text}, {
//         headers: {authorization: password}
//       }).then((response) => {
//         dispatch(addTodo(response.data.todo))
//       }).catch((err) => {
//         dispatch(addAlert("Couldn't create todo."));
//       })
//     })
//   }
// }

var addTodo = (newTodo) => {
  return {
    type: 'ADD_TODO',
    newTodo
  }
}
var removeTodo = (todo_id) => {
  return {
    type: 'REMOVE_TODO',
    todo_id
  }
}
var setTodos = (todos) => {
  return {
    type: 'SET_TODOS',
    todos
  }
}
