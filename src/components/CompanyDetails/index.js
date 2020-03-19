import React, { Component } from "react";
import "./styles.sass";
import DatePicker from "react-date-picker";
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
    date: new Date()
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.DataStore.selectCompany(id);
  }

  onDateChange = date => this.setState({ date });
  // trzeba tu dodać liczenie znow danego income

  render() {
    const DataStore = this.props.DataStore;

    if (DataStore.loading) {
      return <h2>Loading...</h2>;
    }

    let company = DataStore.company;
    const headers = {
      name: "Name",
      id: "ID",
      city: "City"
    };

    const incomes = {
      lastMonthIncome: "Last month income",
      averageIncome: "Average income",
      totalIncome: "Total income"
    };

    company["averageIncome"] = DataStore.averageIncome();
    company["lastMonthIncome"] = DataStore.lastMonthIncome();

    return (
      <div className="companyDetails">
        <ul className="companyDetails__mainList">
          {Object.keys(headers).map(key => (
            <li key={key} className="companyDetails__mainList--element">
              <p className="companyDetails__mainList--title">
                {headers[key]}:{" "}
              </p>
              <p className="companyDetails__mainList--value">{company[key]}</p>
            </li>
          ))}
        </ul>
        <ul className="companyDetails__incomesList">
          {Object.keys(incomes).map(key =>
            key === "lastMonthIncome" ? (
              <li key={key} className="companyDetails__incomesList--element">
                <div className="companyDetails__incomesList--textbox">
                  <p className="companyDetails__incomesList--title">
                    {incomes[key]}:
                  </p>
                  <p className="companyDetails__incomesList--value">
                    {company[key]}
                  </p>
                </div>
              </li>
            ) : (
              <li key={key} className="companyDetails__incomesList--element">
                <div className="companyDetails__incomesList--textbox">
                  <p className="companyDetails__incomesList--title">
                    {incomes[key]}:{" "}
                  </p>
                  <p className="companyDetails__incomesList--value">
                    {company[key]}
                  </p>
                </div>

                <div className="companyDetails__incomesList--datePickerBox">
                  <div className="companyDetails__datePicker">
                    <p className="companyDetails__datePicker--label">
                      Choose first date:
                    </p>
                    <DatePicker
                      id="firstDate"
                      className="companyDetails__datePicker--startDate"
                      onChange={this.onDateChange}
                      value={this.state.date}
                    />
                  </div>

                  <div className="companyDetails__datePicker">
                    <p className="companyDetails__datePicker--label">
                      Choose last date:
                    </p>
                    <DatePicker
                      id="lastDate"
                      className="companyDetails__datePicker--lastDate"
                      onChange={this.onDateChange}
                      value={this.state.date}
                    />
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default CompanyDetails;

const MainList = (headers, company) => (
  <ul className="companyDetails__mainList">
    {Object.keys(headers).map(key => (
      <li key={key} className="companyDetails__mainList--element">
        <p className="companyDetails__mainList--title">{headers[key]}: </p>
        <p className="companyDetails__mainList--value">{company[key]}</p>
      </li>
    ))}
  </ul>
);
