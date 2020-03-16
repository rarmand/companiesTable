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
    // let companies = [];

    this.setState({ loading: true });

    axios.get(pathUrl).then(response => {
      const data = response.data;

      data.forEach(company => {
        // const idPath = detailsPathUrl + company["id"];
        // axios.get(idPath).then(resp => {
        //   const detailsData = resp.data; // id i tablica = obiekt
        //   const updatedCompany = {
        //     ...company,
        //     incomes: detailsData["incomes"]
        //   };
        //   companies.push(updatedCompany);
        // });
      });
      this.setState({ companies: data, loading: false });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.companies !== nextState.companies) {
      return true;
    }
    return false;
  }

  render() {

    return (
      <div className="companyTable">
        <TableFilter />
        <Table companies={this.state.companies} />
      </div>
    );
  }
}

export default CompanyTable;
