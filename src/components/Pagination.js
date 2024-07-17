import React from "react";

const Pagination = ({ total, limit, skip, onPageChange }) => {
  const currentPage = skip / limit + 1;
  const numPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-between items-center">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(skip - limit)}
      >
        Previous
      </button>
      <span>
        {currentPage} of {numPages}
      </span>
      <button
        disabled={currentPage === numPages}
        onClick={() => onPageChange(skip + limit)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
