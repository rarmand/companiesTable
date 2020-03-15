import React from "react";
import "./App.sass";
import CompanyTable from "./components/CompanyTable";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__header--p">Data Science of Companys</h1>
      </header>
      <main className="app__main">
        <CompanyTable />
      </main>
      <footer className="app__footer">
        <p className="app__footer--p">Copyright Aleksandra Holik</p>
      </footer>
    </div>
  );
}

export default App;
