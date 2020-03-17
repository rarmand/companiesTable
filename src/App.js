import React from "react";
import "./App.sass";
import CompanyTable from "./components/CompanyTable";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__header--p">Data Science of Companies</h1>
      </header>
      <main className="app__main">
        <CompanyTable />
      </main>
      <footer className="app__footer">
        <p className="app__footer--p">Copyright &copy; Aleksandra Holik 2020</p>
      </footer>
    </div>
  );
}

export default App;
