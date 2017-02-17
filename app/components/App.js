import React from 'react';
import {connect} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';

// import {} from '../actions'
import Login from './Login'
import Main from './Main'
import AlertContainer from './alerts/AlertContainer'

var App = React.createClass({
  setInitialState() {
    return {
      currentUser: null,
      token: null
    }
  },
  // login(data) {
  //   this.setState({token: data.token, currentUser: data.user}, () => {
  //     console.log("Current User Info from <App /> Component:", this.state)
  //   })
  // },
  render() {
    var renderMainView = () => {
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

    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content'/>
        {renderMainView()}
        <AlertContainer />
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

var mapStateToProps = (state) => {
  return {
    user_id: state.auth.user_id //state from indexReducer
  }
}

module.exports = connect(mapStateToProps)(App);
