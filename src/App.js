import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CompanyDetails from "./components/CompanyDetails";
import CompanyTable from "./components/CompanyTable";
import "./App.sass";
import { inject, observer } from "mobx-react";

@inject("DataStore")
@observer
class App extends Component {
  // download the data with API if not downloaded yet
  componentDidMount = () => {
    if (this.props.DataStore.companies.length === 0)
      this.props.DataStore.downloadCompanies();
  };

  render() {
    return (
      <Router>
        <div className="app">
          <header className="app__header">
            <h1 className="app__header--p">Companies Database</h1>
          </header>
          <main className="app__main">
            <Route exact path="/" component={CompanyTable} />
            <Route path="/companies/:id" component={CompanyDetails} />
          </main>
          <footer className="app__footer">
            <p className="app__footer--p">
              Copyright &copy; Aleksandra Holik 2020
            </p>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
