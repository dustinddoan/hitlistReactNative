import axios from 'axios';
import Keychain from 'react-native-keychain';

import {TODOS_URL, TODO_URL} from '../api';
import {addAlert} from './alertsActions';

exports.createTodo = (text) => {
  return function(dispatch) {
    return Keychain.getGenericPassword().then((credentials) => {
      var {username, password} = credentials;
      return axios.post(TODOS_URL(username), {text}, {
        headers: {authorization: password}
      }).then((response) => {
        dispatch(addTodo(response.data.todo))
      }).catch((err) => {
        dispatch(addAlert("Couldn't create todo."));
      })
    })
  }
}

exports.addTodo = (newTodo) => {
  return {
    type: 'ADD_TODO',
    newTodo
  }
}
