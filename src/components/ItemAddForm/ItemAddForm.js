import React, { Component } from "react";

import "./ItemAddForm.css";

export default class ItemAddForm extends Component {
  constructor() {
    super();

    this.state = {
      label: "",
    };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.onAddItem(this.state.label);
      this.setState({
        label: "",
      });
    };
  }

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="Введите название задачи"
          value={this.state.label}
        />
        <button className="btn btn-primary">Добавить</button>
      </form>
    );
  }
}
