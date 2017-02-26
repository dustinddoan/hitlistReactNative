import axios from 'axios'

import {SIGNIN_URL, SIGNUP_URL} from '../api'
import {addAlert} from './alertsActions'

import {AsyncStorage} from 'react-native'

// NOT return an object
// return a function called THUNK
// which will be hanled in store/index.js
const storageUserId = '@Todo:user_id'
const storageToken = '@Todo:token'

exports.loginUser = (email, password) => {
  return function(dispatch) {
    return axios.post(SIGNIN_URL, {email, password})
      .then((response) => {
        var {user_id, token, user} = response.data
        AsyncStorage.multiSet([
          [storageUserId, user_id],
          [storageToken, token]
        ])
          .then(() => {
            console.log('save');
            dispatch(authUser(user_id, token, user))
          })
          .catch((err) => {

            console.log(err);
          })
      })
  }
}

exports.signupUser = (email, password) => {
  return function(dispatch) {
    return axios.post(SIGNUP_URL, {email, password})
      .then((response) => {
        var {user_id, token, user} = response.data
        AsyncStorage.multiSet([
          [storageUserId, user_id],
          [storageToken, token]
        ])
          .then(() => {
            console.log('save');
            dispatch(authUser(user_id, token, user))
          })
          .catch((err) => {

            console.log(err);
          })
      })
  }
}


// exports.loginUser = (email, password) => {
//   return function(dispatch) {
//     return axios.post(SIGNIN_URL, {email, password})
//       .then((response) => {
//         return new Promise((resolve, reject) => {
//           var {user_id, token, user} = response.data
//           console.log("Response from ")
//           dispatch(authUser(user_id, token, user))
//           // dispatch(addAlert(token))
//           resolve({user_id, token, user})
//         })
//       }).catch((error) => {
//         dispatch(addAlert('Could not log in'))
//       })
//   }
// }
// exports.signupUser = (email, password) => {
//   return function(dispatch) {
//     return axios.post(SIGNUP_URL, {email, password})
//       .then((response) => {
//         return new Promise((resolve, reject) => {
//           var {user_id, token, user} = response.data
//           console.log("Response from ")
//           dispatch(authUser(user_id, token, user))
//           // dispatch(addAlert(token))
//           resolve({user_id, token, user})
//         })
//       }).catch((error) => {
//         dispatch(addAlert('Could not sign up'))
//       })
//   }
// }

// exports.signupUser = (email, password) => {
//   return function(dispatch) {
//     return axios.post(SIGNUP_URL, {email, password}).then((response) => {
//       var {user_id, token} = response.data;
//       Keychain.setGenericPassword(user_id, token)
//         .then(function() {
//           dispatch(authUser(user_id, token));
//         }).catch((error) => {
//           dispatch(addAlert("Could not log in."));
//         });
//     }).catch((error) => {
//       dispatch(addAlert("Could not sign up."));
//     });
//   }
// }

authUser = (user_id, token, currentUser) => {
  return {
    type: 'AUTH_USER',
    user_id,
    token,
    currentUser
  }
}

exports.unauthUser = {
  type: 'UNAUTH_USER'
}
