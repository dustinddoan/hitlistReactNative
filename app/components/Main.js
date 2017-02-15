import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

import {unauthUser} from '../actions'

// onLogout: function() {
//   this.props.dispatch(unauthUser)
// },
// <View style={styles.container}>
//   <Text style={{fontSize: 30}}>
//     Welcome to main
//   </Text>
//
//   <TouchableOpacity onPress={this.onLogout}>
//     <Text style={{fontSize: 20}}>
//       Log Out
//     </Text>
//   </TouchableOpacity>
// </View>

import TodoList from './TodoList'

var Main = React.createClass({

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: TodoList,
          title: 'Todo List',
          navigationBarHidden: true
        }}
        style={{flex: 1}}/>
    )
  }
})
module.exports = Main
