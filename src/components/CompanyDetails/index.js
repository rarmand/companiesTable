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
    startDateAver: new Date(),
    endDateAver: new Date(),
    startDateTotal: new Date(),
    endDateTotal: new Date()
  };

  async componentDidMount() {
    if (this.props.DataStore.companies.length === 0) {
      await this.props.DataStore.downloadCompanies();
    }

    const id = this.props.match.params.id;
    this.props.DataStore.selectCompany(id);
  }

  render() {
    const DataStore = this.props.DataStore;

    if (DataStore.loading || DataStore.company === null) {
      return <h2>Loading...</h2>;
    }

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

    let company = DataStore.company;
    if (!company.hasOwnProperty("lastMonthIncome")) {
      company["lastMonthIncome"] = DataStore.lastMonthIncome();
      company["averageIncome"] = DataStore.averageIncome();
    }

    if (
      this.state.startDateAver.getDay() !== this.state.endDateAver.getDay() ||
      this.state.startDateAver.getMonth() !== this.state.endDateAver.getDay() ||
      this.state.startDateAver.getFullYear() !==
        this.state.endDateAver.getFullYear()
    ) {
      company["averageIncome"] = DataStore.averageIncome(
        this.state.startDateAver,
        this.state.endDateAver
      );
    }

    if (
      this.state.startDateTotal.getDay() !== this.state.endDateTotal.getDay() ||
      this.state.startDateTotal.getMonth() !==
        this.state.endDateTotal.getDay() ||
      this.state.startDateTotal.getFullYear() !==
        this.state.endDateTotal.getFullYear()
    ) {
      company["averageIncome"] = DataStore.averageIncome(
        this.state.startDateTotal,
        this.state.endDateTotal
      );
    }

    return (
      <div className="companyDetails">
        <ul className="companyDetails__mainList">
          {Object.keys(headers).map(key => (
            <li key={key} className="companyDetails__mainList--element">
              <p className="companyDetails__mainList--title">{headers[key]}:</p>
              <p className="companyDetails__mainList--value">{company[key]}</p>
            </li>
          ))}
        </ul>
        <ul className="companyDetails__incomesList">
          <li
            key={"lastMonthIncome"}
            className="companyDetails__incomesList--element"
          >
            <div className="companyDetails__incomesList--textbox">
              <p className="companyDetails__incomesList--title">
                {incomes["lastMonthIncome"]}:
              </p>
              <p className="companyDetails__incomesList--value">
                {company["lastMonthIncome"]}
              </p>
            </div>
          </li>

          {/* average */}
          <li
            key={"averageIncome"}
            className="companyDetails__incomesList--element"
          >
            <div className="companyDetails__incomesList--textbox">
              <p className="companyDetails__incomesList--title">
                {incomes["averageIncome"]}:
              </p>
              <p className="companyDetails__incomesList--value">
                {company["averageIncome"]}
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
                  onChange={date => this.setState({ startDateAver: date })}
                  value={this.state.startDateAver}
                  maxDate={this.state.endDateAver}
                />
              </div>

              <div className="companyDetails__datePicker">
                <p className="companyDetails__datePicker--label">
                  Choose last date:
                </p>
                <DatePicker
                  id="lastDate"
                  className="companyDetails__datePicker--lastDate"
                  onChange={date => this.setState({ endDateAver: date })}
                  value={this.state.endDateAver}
                  minDate={this.state.startDateAver}
                />
              </div>
            </div>
          </li>

          {/* total */}
          <li
            key={"totalIncome"}
            className="companyDetails__incomesList--element"
          >
            <div className="companyDetails__incomesList--textbox">
              <p className="companyDetails__incomesList--title">
                {incomes["totalIncome"]}:
              </p>
              <p className="companyDetails__incomesList--value">
                {company["totalIncome"]}
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
                  onChange={date => this.setState({ startDateTotal: date })}
                  value={this.state.startDateTotal}
                  maxDate={this.state.endDateTotal}
                />
              </div>

              <div className="companyDetails__datePicker">
                <p className="companyDetails__datePicker--label">
                  Choose last date:
                </p>
                <DatePicker
                  id="lastDate"
                  className="companyDetails__datePicker--lastDate"
                  onChange={date => this.setState({ endDateTotal: date })}
                  value={this.state.endDateTotal}
                  minDate={this.state.startDateTotal}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default CompanyDetails;
