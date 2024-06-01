import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [ongoingTodos, setOngoingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedOngoingTodos = JSON.parse(localStorage.getItem('ongoingTodos')) || [];
    const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];
    setTodos(savedTodos);
    setOngoingTodos(savedOngoingTodos);
    setCompletedTodos(savedCompletedTodos);
  }, []);

  const saveToLocalStorage = (todos, ongoingTodos, completedTodos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('ongoingTodos', JSON.stringify(ongoingTodos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  };

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, status: 'todo' };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    saveToLocalStorage(newTodos, ongoingTodos, completedTodos);
  };

  const moveToOngoing = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const newOngoingTodos = [...ongoingTodos, { ...todo, status: 'ongoing' }];
      const newTodos = todos.filter((todo) => todo.id !== id);
      setOngoingTodos(newOngoingTodos);
      setTodos(newTodos);
      saveToLocalStorage(newTodos, newOngoingTodos, completedTodos);
    }
  };

  const moveToCompleted = (id) => {
    const todo = ongoingTodos.find((todo) => todo.id === id);
    if (todo) {
      const newCompletedTodos = [...completedTodos, { ...todo, status: 'completed' }];
      const newOngoingTodos = ongoingTodos.filter((todo) => todo.id !== id);
      setCompletedTodos(newCompletedTodos);
      setOngoingTodos(newOngoingTodos);
      saveToLocalStorage(todos, newOngoingTodos, newCompletedTodos);
    }
  };

  const deleteTodo = (id, status) => {
    if (status === 'todo') {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      saveToLocalStorage(newTodos, ongoingTodos, completedTodos);
    } else if (status === 'ongoing') {
      const newOngoingTodos = ongoingTodos.filter((todo) => todo.id !== id);
      setOngoingTodos(newOngoingTodos);
      saveToLocalStorage(todos, newOngoingTodos, completedTodos);
    } else if (status === 'completed') {
      const newCompletedTodos = completedTodos.filter((todo) => todo.id !== id);
      setCompletedTodos(newCompletedTodos);
      saveToLocalStorage(todos, ongoingTodos, newCompletedTodos);
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
