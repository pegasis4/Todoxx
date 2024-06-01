import React, { useState, useEffect } from 'react';

const TodoList = ({ title, todos, moveToOngoing, moveToCompleted, deleteTodo }) => {
  const [localTodos, setLocalTodos] = useState(todos);

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="todo-list">
      <h2>{title}</h2>
      {localTodos.length === 0 ? (
        <p className="no-todos">No todos</p>
      ) : (
        localTodos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <span>{todo.text}</span>
            {todo.status === 'completed' && <span>{formatDate(todo.id)}</span>}
            <div className="button-group">
              {moveToOngoing && todo.status === 'todo' && (
                <button onClick={() => moveToOngoing(todo.id)} className="btn ongoing-btn">Ongoing</button>
              )}
              {moveToCompleted && todo.status === 'ongoing' && (
                <button onClick={() => moveToCompleted(todo.id)} className="btn completed-btn">Completed</button>
              )}
              <button onClick={() => deleteTodo(todo.id, todo.status)} className="btn delete-btn">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
