import React, { Component } from "react";
import "./SearchPanel.css";

export default class SearchPanel extends Component {
  constructor() {
    super();

    this.state = {
      term: "",
    };

    this.onSearchChange = (e) => {
      const term = e.target.value;
      this.setState({ term });
      this.props.onSearchChange(term);
    };
  }

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="Найти"
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    );
  }
}
