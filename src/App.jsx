import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [ongoingTodos, setOngoingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, status: 'todo' };
    setTodos([...todos, newTodo]);
  };

  const moveToOngoing = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setOngoingTodos([...ongoingTodos, { ...todo, status: 'ongoing' }]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const moveToCompleted = (id) => {
    const todo = ongoingTodos.find((todo) => todo.id === id);
    if (todo) {
      setCompletedTodos([...completedTodos, { ...todo, status: 'completed' }]);
      setOngoingTodos(ongoingTodos.filter((todo) => todo.id !== id));
    }
  };

  const deleteTodo = (id, status) => {
    if (status === 'todo') {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else if (status === 'ongoing') {
      setOngoingTodos(ongoingTodos.filter((todo) => todo.id !== id));
    } else if (status === 'completed') {
      setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoInput addTodo={addTodo} />
      <div className="container">
        <TodoList title="Todo" todos={todos} moveToOngoing={moveToOngoing} deleteTodo={deleteTodo} />
        <TodoList title="Ongoing" todos={ongoingTodos} moveToCompleted={moveToCompleted} deleteTodo={deleteTodo} />
        <TodoList title="Completed" todos={completedTodos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};

export default App;
