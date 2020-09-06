import React, { Component } from "react";

import AppHeader from "../AppHeader/AppHeader";
import SearchPanel from "../SearchPanel/SearchPanel";
import TodoList from "../TodoList/TodoList";
import "./App.css";
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";

export default class App extends Component {
  constructor() {
    super();

    this.maxId = 100;

    this.createItem = (label) => {
      return {
        label,
        done: false,
        important: false,
        id: this.maxId++,
      };
    };
    this.state = {
      todoData: [
        { label: "Tesla", important: false, id: 1 },
        { label: "Mercedes-Benz", important: true, id: 2 },
        { label: "BMW", important: false, id: 3 },
      ],
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const newArray = [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1),
        ];

        return {
          todoData: newArray,
        };
      });
    };
    this.addItem = (text) => {
      const newItem = this.createItem(text);

      this.setState(({ todoData }) => {
        const newArray = [...todoData, newItem];

        return {
          todoData: newArray,
        };
      });
    };
    this.toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };

      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    };
    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, "done"),
        };
      });
    };
    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, "important"),
        };
      });
    };
  }

  render() {
    const { todoData } = this.state;

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList todos={this.state.todoData} onDeleted={this.deleteItem} />
      </div>
    );
  }
}
