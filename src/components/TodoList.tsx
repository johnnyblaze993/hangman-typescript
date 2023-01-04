import React, { FC, useState } from "react";

const TodoList: FC = () => {
  const [todos, setTodos] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!e.currentTarget.todo.value) return;
    const newTodo = e.currentTarget.todo.value;
    setTodos([...todos, newTodo]);
    e.currentTarget.todo.value = "";
  };
  return (
    <div>
      <h1>React TypeScript todo list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type todo here"
          className="todo-input"
          name="todo"
          onChange={(e) => e.currentTarget.value}
        />
        <button className="todo-button" type="submit">
          Add
        </button>
      </form>

      <div className="todo-container">
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
