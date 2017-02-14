import React from 'react';
import {connect} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

// import {} from '../actions'
import Login from './Login'
import Main from './Main'

var App = React.createClass({

  render() {
    if(this.props.user_id) {
      return (
        <Main />
      )
    } else {
      return (
        <Login />
      )
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})

var mapStateToProps = (state) => {
  return {
    user_id: state.auth.user_id
  }
}

module.exports = connect(mapStateToProps)(App);
