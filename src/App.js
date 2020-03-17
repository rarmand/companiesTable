import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CompanyDetails from "./components/CompanyDetails";
import CompanyTable from "./components/CompanyTable";
import "./App.sass";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app__header">
          <h1 className="app__header--p">Data Science of Companies</h1>
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

export default App;
