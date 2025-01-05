import React from "react";
import TodoItems from "../TodoItem/TodoItems";
import "./TodoBoard.css";

const TodoBoard = ({ todoList }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item) => <TodoItems item={item} />)
      ) : (
        <h2>There is no item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
