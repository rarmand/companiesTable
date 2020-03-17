import React from "react";
import "./styles.sass";

function Pagination({ totalCompanies, companiesPerPage, paginate }) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalCompanies / companiesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pages.map(number => (
          <li key={number} className="pagination__list--element">
            <a
              href="!#"
              onClick={() => paginate(number)}
              className="pagination__list--link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
