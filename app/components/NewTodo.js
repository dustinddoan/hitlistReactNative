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
      // console.log(this.state.newTodoText);
      axios.post('http://localhost:3000/v1/users/'+ '58a6222609b23368042b80dc' +'/todos',
       {'text': this.state.newTodoText},
       {headers: {authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGE2MjIyNjA5YjIzMzY4MDQyYjgwZGMiLCJpYXQiOjE0ODcyODI4MDQ3MTZ9.V7tFOtAOiKrX8yG-yCGUsdeUR_xPaDryJ69AFxH9o2M'}
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
    todos: state.todos
  }
}

module.exports = connect(mapStateToProps)(NewTodo)
