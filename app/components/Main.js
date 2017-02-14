import React from 'react';
import {connect} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {unauthUser} from '../actions'

var Main = React.createClass({
  onLogout: function() {
    this.props.dispatch(unauthUser)
  },
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>
          Welcome to main
        </Text>

        <TouchableOpacity onPress={this.onLogout}>
          <Text style={{fontSize: 20}}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
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



module.exports = connect()(Main)
