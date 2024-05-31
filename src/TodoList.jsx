import React, { useState, useEffect } from 'react';

const TodoList = ({ title, todos, moveToOngoing, moveToCompleted}) => {
  const [todoss, setTodos] = useState(todos);

  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  const del = (id) => {
    const newTodos = todoss.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  };


  return (
    <div className="todo-list">
      <h2>{title}</h2>
      {todoss.length === 0 ? (
        <p className="no-todos">No todos</p>
      ) : (
        todoss.map((todo) => (
          <div key={todo.id} className="todo-item">
            <span>{todo.text }</span>
            <span>{formatDate(todo.id)}</span>
            <div className="button-group">
              {moveToOngoing && (
                <button onClick={() => moveToOngoing(todo.id)} className="btn ongoing-btn">Ongoing</button>
              )}
              {moveToCompleted && (
                <button onClick={() => moveToCompleted(todo.id)} className="btn completed-btn">Completed</button>
              )}
              <button onClick={() => del(todo.id)} className="btn delete-btn">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
