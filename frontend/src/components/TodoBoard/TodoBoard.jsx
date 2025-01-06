import React from "react";
import TodoItems from "../TodoItem/TodoItems";
import "./TodoBoard.css";

const TodoBoard = ({ todoList, onDelete, onMarkDone }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item) => (
          <TodoItems
            item={item}
            key={item.id}
            onDelete={onDelete}
            onMarkDone={onMarkDone}
          />
        ))
      ) : (
        <h2>There is no item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
