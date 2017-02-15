import React from 'react';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Octicons';

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




//TodoList components
var NewTodo = React.createClass({
  getInitialState() {
    return {
      newTodoText: undefined
    }
  },
  addNewTodo() {
    var {newTodoText} = this.state
    if(newTodoText && newTodoText !== '') {
      console.log(this.state.newTodoText);
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