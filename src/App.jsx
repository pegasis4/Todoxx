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
    setOngoingTodos([...ongoingTodos, { ...todo, status: 'ongoing' }]);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const moveToCompleted = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setCompletedTodos([...completedTodos, { ...todo, status: 'completed' }]);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoInput addTodo={addTodo} />
      <div className="container">
        <TodoList title="Todo" todos={todos} moveToOngoing={moveToOngoing} moveToCompleted={moveToCompleted} />
        <TodoList title="Ongoing" todos={ongoingTodos}/>
        <TodoList title="Completed" todos={completedTodos}/>
      </div>
    </div>
  );
};

export default App;
