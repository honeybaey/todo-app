import React from "react";

import AppHeader from "../AppHeader/AppHeader";
import SearchPanel from "../SearchPanel/SearchPanel";
import TodoList from "../TodoList/TodoList";
import "./App.css";
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";

const todoData = [
  { label: "Tesla", important: false, id: 1 },
  { label: "Mercedes-Benz", important: true, id: 2 },
  { label: "BMW", important: false, id: 3 },
];

const App = () => {
  return (
    <div className="todo-app">
      <AppHeader toDo={1} done={3} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList todos={todoData} onDeleted={ (id) => console.log("del", id) } />
    </div>
  );
};

export default App;
