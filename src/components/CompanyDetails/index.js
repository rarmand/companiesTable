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
  state = {
    company: {}
  };

  componentDidMount() {
    const DataStore = this.props.DataStore;
    const id = this.props.match.params.id;
    const company = DataStore.companies.find(company => company.id === id);
    console.log(company);
    // this.setState({ company: company });
  }

  render() {
    return (
      <div className="companyDetails">
        <h1>Object id : {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default CompanyDetails;
