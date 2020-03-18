import React, { Component } from "react";
import "./styles.sass";
import { inject, observer } from "mobx-react";
/*
This view should contain information from the table + average income
(average of company incomes) and last month income (sum of last
month incomes). Users should have an option to describe the range
(start and end date) of calculated data (total and average income).

(Optional) This view should also contain a graph representing monthly
incomes.
*/

@inject("DataStore")
@observer
class CompanyDetails extends Component {
  componentDidMount() {
    this.props.DataStore.selectCompany(this.props.match.params.id);
    console.log(this.props.match.params.id);
  }

  render() {
    const headers = {
      id: "ID",
      name: "Name",
      city: "City",
      totalIncome: "Total income",
      averageIncome: "Average income"
    };

    const incomes = {
      averageIncome: "Average income",
      lastIcome: "Last month income"
    };

    let company = this.props.DataStore.company;
    company["averageIncome"] = this.props.DataStore.averageIncome();

    return (
      <div className="companyDetails">
        <ul className="companyDetails__list">
          {Object.keys(headers).map(key => (
            <li key={key} className="companyDetails__list--element">
              {headers[key]}: <b>{company[key]}</b>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CompanyDetails;
