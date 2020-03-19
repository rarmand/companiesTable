import React, { Component } from "react";
import "./styles.sass";
import Table from "../Table";
import TableFilter from "../TableFilter";
import Pagination from "../Pagination";
import { inject, observer } from "mobx-react";

@inject("DataStore")
@observer
class CompanyTable extends Component {
  render() {
    // mobx store
    const DataStore = this.props.DataStore;

    // get current posts
    const indexOfLastCompany =
      DataStore.currentPage * DataStore.companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - DataStore.companiesPerPage;
    const currentCompanies = DataStore.companiesFiltered.slice(
      indexOfFirstCompany,
      indexOfLastCompany
    );

    return (
      <div className="companyTable">
        <TableFilter filter={DataStore.filter} />
        <Table
          onCompanyClick={DataStore.selectCompany}
          loading={DataStore.loading}
          companies={currentCompanies}
        />
        <Pagination
          totalCompanies={DataStore.companiesFiltered.length}
          companiesPerPage={DataStore.companiesPerPage}
          currentPage={DataStore.currentPage}
          paginate={DataStore.paginate}
        />
      </div>
    );
  }
}

export default CompanyTable;
