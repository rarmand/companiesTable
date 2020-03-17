import React, { Component } from "react";
import axios from "axios";
import "./styles.sass";
import Table from "../Table";
import TableFilter from "../TableFilter";
import Pagination from "../Pagination";

const pathUrl = `https://recruitment.hal.skygate.io/companies`; // url to companies list
const detailsPathUrl = `https://recruitment.hal.skygate.io/incomes/`; // needs an id of company

class CompanyTable extends Component {
  state = {
    companies: [],
    companiesFiltered: [],
    loading: false,
    currentPage: 1,
    companiesPerPage: 10
  };

  // download the data with API
  componentDidMount = () => {
    this.setState({ loading: true });
    let currentComponent = this;
    let companies = [];

    axios
      .get(pathUrl)
      .then(async response => {
        const data = response.data;

        await Promise.all(
          data.map(async company => {
            const idPath = detailsPathUrl + company["id"];
            await axios.get(idPath).then(resp => {
              const detailsData = resp.data;

              // count total income per company
              const totalIncome = detailsData["incomes"].reduce(
                (prevObj, currObj) => ({
                  value: parseFloat(prevObj.value) + parseFloat(currObj.value)
                })
              );

              const updatedCompany = {
                ...company,
                incomes: detailsData["incomes"],
                totalIncome: totalIncome.value.toFixed(2)
              };

              companies.push(updatedCompany);
            });
          })
        ).catch(e => console.log(`Error! ${e.message}`));

        // sorting
        companies.sort((prevObj, currentObj) =>
          prevObj.totalIncome >= currentObj.totalIncome ? -1 : 1
        );
        currentComponent.setState({
          companies: companies,
          companiesFiltered: companies,
          loading: false
        });
      })
      .catch(e => console.log(`Error! ${e.message}`));
  };

  // change page
  paginate = number => {
    this.setState({ currentPage: number });
  };

  // filter table of companies by name
  filter = name => {
    let companiesUpdated = this.state.companies;
    companiesUpdated = companiesUpdated.filter(company => {
      return company["name"].toLowerCase().search(name.toLowerCase()) !== -1;
    });

    this.setState({ companiesFiltered: companiesUpdated });
  };

  render() {
    // get current posts
    const indexOfLastCompany =
      this.state.currentPage * this.state.companiesPerPage;
    const indexOfFirstCompany =
      indexOfLastCompany - this.state.companiesPerPage;
    const currentCompanies = this.state.companiesFiltered.slice(
      indexOfFirstCompany,
      indexOfLastCompany
    );

    return (
      <div className="companyTable">
        <TableFilter filter={this.filter} />
        <Table loading={this.state.loading} companies={currentCompanies} />
        <Pagination
          totalCompanies={this.state.companiesFiltered.length}
          companiesPerPage={this.state.companiesPerPage}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default CompanyTable;
