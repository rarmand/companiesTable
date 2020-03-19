import React, { Component } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";

class Table extends Component {
  render() {
    const { loading, companies, onCompanyClick } = this.props;
    const headers = {
      id: "ID",
      name: "Name",
      city: "City",
      totalIncome: "Total income"
    };

    if (loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="tableContainer">
        <table className="tableContainer__table">
          <thead>{TableHeader(headers)}</thead>
          <tbody>
            {companies.map((company, index) =>
              TableRow(headers, company, index, onCompanyClick)
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const TableHeader = headers => (
  <tr className="tableContainer__table--rowHeader">
    {Object.values(headers).map(value => (
      <th key={value} className="tableContainer__table--cellHeader">
        {value}
      </th>
    ))}
  </tr>
);

const TableRow = (headers, company, index, onCompanyClick) => (
  <tr key={index} className="tableContainer__table--row">
    {Object.keys(headers).map(key =>
      key === "name" ? (
        <td key={key} className="tableContainer__table--cell">
          <Link
            to={"/companies/" + company.id}
            className="tableContainer__table--a"
            onClick={() => onCompanyClick(company.id)}
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

export default Table;
