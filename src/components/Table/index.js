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

    if (this.props.loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="tableContainer">
        <table className="tableContainer__table">
          <thead>
            <tr className="tableContainer__table--rowHeader">
              {Object.values(headers).map(value => (
                <th key={value} className="tableContainer__table--cellHeader">
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.companies.map(company => (
              <tr className="tableContainer__table--row">
                {Object.keys(headers).map((key, index) => (
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
