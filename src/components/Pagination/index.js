import React from "react";
import "./styles.sass";

function Pagination({
  totalCompanies,
  companiesPerPage,
  currentPage,
  paginate
}) {
  const delta = 2;
  const lastPage = Math.ceil(totalCompanies / companiesPerPage);
  const leftPage = currentPage - delta;
  const rightPage = currentPage + delta;

  const range = [];
  const pages = [];

  for (let i = 1; i <= lastPage; i++) {
    if (i === 1 || i === lastPage || (i >= leftPage && i <= rightPage)) {
      range.push(i);
    }
  }

  for (let i = 0; i < range.length; i++) {
    if (i > 0) {
      if (range[i] - range[i - 1] !== 1) pages.push(-1);
    }
    pages.push(range[i]);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pages.map(number =>
          number === -1 ? (
            <li key={number} className="pagination__list--element">
              <span className="pagination__list--link">...</span>
            </li>
          ) : (
            <li key={number} className="pagination__list--element">
              <a
                href="!#"
                onClick={() => paginate(number)}
                className="pagination__list--link"
              >
                {number}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Pagination;
