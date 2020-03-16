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
          id="inputCompanyName"
          className="tableFilter__input"
          type="text"
        ></input>
      </div>
    );
  }
}

export default TableFilter;
