import axios from 'axios'

import {SIGNIN_URL, SIGNUP_URL} from '../api'
import {addAlert} from './alertsActions'

// NOT return an object
// return a function called THUNK
// which will be hanled in store/index.js
exports.loginUser = (email, password) => {
  return function(dispatch) {
    return axios.post(SIGNIN_URL, {email, password})
      .then((response) => {
        var {user_id, token} = response.data
        dispatch(authUser(user_id))
        // dispatch(addAlert(token))
      }).catch((error) => {
        dispatch(addAlert('Could not log in'))
      })
  }
}

exports.signupUser = (email, password) => {
  return function(dispatch) {
    return axios.post(SIGNUP_URL, {email, password}).then((response) => {
      var {user_id, token} = response.data;
      Keychain.setGenericPassword(user_id, token)
        .then(function() {
          dispatch(authUser(user_id));
        }).catch((error) => {
          dispatch(addAlert("Could not log in."));
        });
    }).catch((error) => {
      dispatch(addAlert("Could not sign up."));
    });
  }
}

authUser = (user_id) => {
  return {
    type: 'AUTH_USER',
    user_id
  }
}

exports.unauthUser = {
  type: 'UNAUTH_USER'
}
