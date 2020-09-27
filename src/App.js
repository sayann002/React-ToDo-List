import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Todos from './Components/Todos';
import Header from './Components/layout/Header';
import AddTodo from './Components/AddTodo';
import About from './Components/pages/About';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';



class App extends Component {
  state = {
    todos:[]
  }
 
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3')
    .then(response => this.setState({ todos: response.data }))
  }


  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      } return todo
    }) })
    }

  delTodo = (id) => {
    this.setState({todos:[...this.state.todos.filter(todo => todo.id !== id)]})
    
  }
  addTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false
    }
    this.setState( { todos: [...this.state.todos, newTodo] } );
  }

/*
 delTodo = (id) => {
   axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
   .then(response => this.setState({todos:[...this.state.todos.filter(todo => todo.id !== id)] }))
 }
 
addTodo = (title) => {
   axios.post('https://jsonplaceholder.typicode.com/todos',{
    title,
    completed: false
   })
   .then(response => this.setState({ todos: [...this.state.todos,response.data] }))
  }
*/
 render(){
    
  return (
    <Router>
    <div className="App">
      <div className="container">
        <Header />
        <Route exact path="/" render={props => (
          <React.Fragment>
            <AddTodo addTodo={this.addTodo}/>
            <Todos todos={this.state.todos} markComplete={this.markComplete} 
            delTodo={this.delTodo}/>
          </React.Fragment>
        )} />
        <Route path="/about" component={About} />
      </div>
    </div>
    </Router>
  );
  }
}
export default App;
