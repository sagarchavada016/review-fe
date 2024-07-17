import React from "react";

const Pagination = ({ total, limit, skip, onPageChange }) => {
  const currentPage = skip / limit + 1;
  const numPages = Math.ceil(total / limit);

  return (
    <div className="mt-4 flex justify-center items-center space-x-4">
      <button
        className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(skip - limit)}
      >
        Previous
      </button>
      <span className="text-lg">
        {currentPage} of {numPages}
      </span>
      <button
        className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === numPages}
        onClick={() => onPageChange(skip + limit)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
