import React, { Component } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";
// import { inject, observer } from "mobx-react";

// @inject("DataStore")
// @observer
class Table extends Component {
  render() {
    const { loading, companies } = this.props;
    // const DataStore = this.props.DataStore;

    const headers = {
      id: "ID",
      name: "Name",
      city: "City",
      totalIncome: "Total income"
    };

    const TableHeader = () => (
      <tr className="tableContainer__table--rowHeader">
        {Object.values(headers).map(value => (
          <th key={value} className="tableContainer__table--cellHeader">
            {value}
          </th>
        ))}
      </tr>
    );
    const TableRow = (company, index) => (
      <tr key={index} className="tableContainer__table--row">
        {Object.keys(headers).map(key =>
          key === "name" ? (
            <td key={key} className="tableContainer__table--cell">
              <Link
                to={"/companies/" + company.id}
                className="tableContainer__table--a"
                onClick={() => 1}
              >
                {company[key]}
              </Link>
            </td>
          ) : (
            <td key={key} className="tableContainer__table--cell">
              {company[key]}
            </td>
          )
        )}
      </tr>
    );

    if (loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="tableContainer">
        <table className="tableContainer__table">
          <thead>{TableHeader()}</thead>
          <tbody>
            {companies.map((company, index) => TableRow(company, index))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
