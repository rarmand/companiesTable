import React, { Component } from "react";
import axios from "axios";
import "./styles.sass";

const pathUrl = `https://recruitment.hal.skygate.io/companies`;

class CompanyTable extends Component {
  state = {
    companies: []
  };

  componentDidMount() {
    axios.get(pathUrl).then(response => {
      const data = response.data;
      this.setState({ companies: data });
    });
  }

  render() {
    const headers = {
      id: "ID",
      name: "Name",
      city: "City",
      totalIncome: "Total income"
    };

    const inputLabel = "Search by company's name";

    return (
      <div className="companyTable">
        <div className="companyTable__search">
          <label for="inputCompanyName" className="companyTable__search--label">
            {inputLabel}:
          </label>
          <input
            id="inputCompanyName"
            className="companyTable__search--input"
            type="text"
          ></input>
        </div>
        <div className="companyTable__table">
          <table className="companyTable__table--table">
            <tr className="companyTable__table--rowHeader">
              {Object.values(headers).map(value => (
                <th className="companyTable__table--cellHeader">{value}</th>
              ))}
            </tr>

            {this.state.companies.map(company => (
              <tr className="companyTable__table--row">
                {Object.keys(headers).map(key => (
                  <td className="companyTable__table--cell">{company[key]}</td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default CompanyTable;
