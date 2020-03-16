import React, { Component } from "react";
import "./styles.sass";

class Table extends Component {

  render() {
    const headers = {
      id: "ID",
      name: "Name",
      city: "City",
      totalIncome: "Total income"
    };

    return (
      <div className="tableContainer">
        <table className="tableContainer__table">
          <caption>Companies incomes for 2019 year</caption>
          <thead>
            <tr className="tableContainer__table--rowHeader">
              {Object.values(headers).map((value, index) => (
                <th key={index} className="tableContainer__table--cellHeader">
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.companies.map((company, index) => (
              <tr className="tableContainer__table--row">
                {Object.keys(headers).map(key => (
                  <td key={index} className="tableContainer__table--cell">
                    {company[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
