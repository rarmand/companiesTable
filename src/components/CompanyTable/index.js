import React, { Component } from "react";
import axios from "axios";

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

    return (
      <div className="companyTable">
        <input type="text"></input>
        <div className="companyTable__table">
          <table className="companyTable__table--table">
            <tr className="companyTable__table--rowTitle">
              {Object.values(headers).map(value => (
                <th className="companyTable__table--cellHeader">{value}</th>
              ))}
            </tr>

            {this.state.companies.map(company => (
              <tr className="companyTable__table--row">
                {Object.keys(headers).map(key => (
                  <th className="companyTable__table--cellHeader">
                    {company[key]}
                  </th>
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
