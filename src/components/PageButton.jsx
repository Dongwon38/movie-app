import React from "react";

function PageButton({ page, changePage, totalPages }) {
  // number of pages
  const maxPage = totalPages;
  const thresholdStart = 3;
  const thresholdEnd = maxPage - 2;
  const numbersOfPageLink = [];

  if (page <= thresholdStart) {
    numbersOfPageLink.push(1, 2, 3, 4, 5, "...");
  } else if (page >= thresholdEnd) {
    numbersOfPageLink.push(
      "...",
      maxPage - 4,
      maxPage - 3,
      maxPage - 2,
      maxPage - 1,
      maxPage
    );
  } else {
    numbersOfPageLink.push(
      "...",
      page - 2,
      page - 1,
      page,
      page + 1,
      page + 2,
      "..."
    );
  }

  // button for change the page
  function handleGetPage(e) {
    const newPage = Number(e.target.value);
    if (!isNaN(newPage)) {
      changePage(newPage);
    }
  }

  return (
    <span>
      {/* buttons for navigate page */}
      {numbersOfPageLink.map((pageNumber, index) => {
        if (typeof pageNumber === "string") {
          return <p key={index}>{pageNumber}</p>;
        } else {
          return (
            <button key={index} onClick={handleGetPage} value={pageNumber}>
              {pageNumber}
            </button>
          );
        }
      })}
    </span>
  );
}

export default PageButton;
