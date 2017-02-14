import update from 'react-addons-update'
import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

var defaultState = {}
module.exports = combineReducers({
  form: formReducer
})
