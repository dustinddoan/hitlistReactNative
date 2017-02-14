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
var App = React.createClass({

  render() {
    return (
      <Login />
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})



module.exports = App
