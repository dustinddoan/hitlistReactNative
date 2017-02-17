import React from 'react';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Octicons';
import axios from 'axios'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput
} from 'react-native';
import {unauthUser} from '../actions'

import {addTodo} from '../actions'


//TodoList components
var NewTodo = React.createClass({
  getInitialState() {
    return {
      newTodoText: undefined
    }
  },
  addNewTodo() {
    var {newTodoText} = this.state
    var {dispatch} = this.props;

    if(newTodoText && newTodoText !== '') {
      console.log(this.state.newTodoText)
      console.log(this.props.token)
      axios.post('https://hidden-plains-11034.herokuapp.com/v1/users/'+ this.props.user_id +'/todos',
       {'text': this.state.newTodoText},
      //  {headers: {authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGE2M2E3YTNkMjMwZTA2MWY0MmEyMDgiLCJpYXQiOjE0ODcyOTQyNjI2Nzh9.cFSgUWaYyRe12ZQPtgxKf7n5J8quVMz1GiC1Xw-C8oQ'}
       {headers: {authorization: this.props.token}
      }).then((response) => {
         console.log(response.data.todos)
         dispatch(addTodo(response.data.todos))
         this.props.navigator.pop();

       })
       .catch((error) => {
         console.log(error);
       })

    }

  },
  onBack() {
    this.props.navigator.pop()
  },
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.onBack}>
            <Icon name="chevron-left" size={20} color="white"/>
          </TouchableOpacity>

          <Text style={styles.title}>
            Add New ToDo
          </Text>
          <TouchableOpacity onPress={this.addNewTodo}>
            <Icon name="check" size={20} color="white"/>
          </TouchableOpacity>
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(newTodoText) => {
                this.setState({newTodoText})
              }}
              placeholder="New To-Do Text"
              style={styles.input}/>
          </View>
        </ScrollView>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  inputContainer: {
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#2ecc71"
  },
  input: {
    height: 26
  }
})

var mapStateToProps = (state) => {
  return {
    todos: state.todos,
    user_id: state.auth.user_id,
    token: state.auth.token,
    currentUser: state.auth.currentUser
  }
}

module.exports = connect(mapStateToProps)(NewTodo)
