// TodoList.js
import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todoList, handleRemove }) => {
  return (
    <div>
      {todoList.map((item) => (
        <TodoItem key={item.id} item={item} handleRemove={handleRemove} />
      ))}
    </div>
  );
};

export default TodoList;
