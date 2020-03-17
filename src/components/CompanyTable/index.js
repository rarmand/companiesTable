import React, { Component } from "react";
import axios from "axios";
import "./styles.sass";
import Table from "../Table";
import TableFilter from "../TableFilter";

const pathUrl = `https://recruitment.hal.skygate.io/companies`; // url to companies list
const detailsPathUrl = `https://recruitment.hal.skygate.io/incomes/`; // needs an id of company

class CompanyTable extends Component {
  state = {
    companies: [],
    loading: false,
    currentPage: 1,
    postsPerPage: 10
  };

  componentDidMount() {
    this.setState({ loading: true });
    let currentComponent = this;
    let companies = [];

    axios.get(pathUrl).then(async response => {
      const data = response.data;

      await Promise.all(
        data.map(async company => {
          const idPath = detailsPathUrl + company["id"];
          await axios.get(idPath).then(resp => {
            const detailsData = resp.data;
            const updatedCompany = {
              ...company,
              incomes: detailsData["incomes"]
            };

            companies.push(updatedCompany);
          });
        })
      ).catch(e => console.log(`Error! ${e.message}`));

      currentComponent.setState({ companies: companies, loading: false });
    });
  }

  render() {
    return (
      <div className="companyTable">
        <TableFilter />
        <Table loading={this.state.loading} companies={this.state.companies} />
      </div>
    );
  }
}

export default CompanyTable;
