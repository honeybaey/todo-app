import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import "./TodoList.css";

const TodoList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem {...itemProps} /> {/* this is spread operator */}
        {/* <TodoListItem label={item.label} important={item.important} /> */}
      </li>
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
