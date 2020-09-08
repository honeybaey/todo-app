import React, { Component } from "react";

import AppHeader from "../AppHeader/AppHeader";
import SearchPanel from "../SearchPanel/SearchPanel";
import TodoList from "../TodoList/TodoList";
import "./App.css";
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";
import ItemAddForm from "../ItemAddForm/ItemAddForm";

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
        this.createItem("Tesla"),
        this.createItem("Mercedes-Benz"),
        this.createItem("BMW"),
      ],
      term: "",
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

    this.onSearchChange = (term) => {
      this.setState({ term });
    };

    this.search = (items, term) => {
      if (term.length === 0) {
        return items;
      }

      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    };

    this.onActiveButton = () => {
      console.log("active toggled");
    };

    this.onDoneButton = () => {
      console.log("done toggled");
    };
  }

  render() {
    const { todoData, term } = this.state;

    const visibleItems = this.search(todoData, term);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            onDoneButton={this.onDoneButton}
            onActiveButton={this.onActiveButton}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onAddItem={this.addItem} />
      </div>
    );
  }
}
