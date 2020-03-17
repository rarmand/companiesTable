import React, { Component } from "react";
import "./styles.sass";

class TableFilter extends Component {
  render() {
    const inputLabel = "Search by company's name";

    return (
      <div className="tableFilter">
        <label htmlFor="inputCompanyName" className="tableFilter__label">
          {inputLabel}:
        </label>
        <input
          type="text"
          id="inputCompanyName"
          className="tableFilter__input"
          onChange={e => this.props.filter(e.target.value)}
        ></input>
      </div>
    );
  }
}

export default TableFilter;
