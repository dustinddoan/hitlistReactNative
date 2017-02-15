import React from 'react';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Octicons';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import {unauthUser} from '../actions'


//TodoItem
var TodoItem = React.createClass({
  render() {
    return (
      <View style={styles.todoContainer}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
})

//TodoList components
var TodoList = React.createClass({
  getInitialState() {
    return {
      refreshing: false
    }
  },
  onLogout() {
    this.props.dispatch(unauthUser)
  },
  addNewTodo() {

  },
  onRefresh() {

  },
  render() {
    console.log(this.props.todos);
    //return list of components
    var renderTodos = () => {
      return this.props.todos.map((todo) => {
        return (
          <TodoItem key={todo._id} text={todo.text} id={todo._id}/>
        )
      })
    }
    //
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
         <TouchableOpacity onPress={this.onLogout}>
           <Icon name="x" size={20} color="white"/>
         </TouchableOpacity>
         <Text style={styles.title}>
           To-Do List
         </Text>
         <TouchableOpacity onPress={this.addNewTodo}>
           <Icon name="plus" size={20} color="white"/>
         </TouchableOpacity>
       </View>
       <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}/>
          }
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.scrollViewContainer}>
          {renderTodos()}
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
  todoContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: -1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

var mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

module.exports = connect(mapStateToProps)(TodoList)
