import React from "react";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div className="mt-4 flex items-center justify-center gap-4 text-white">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600"
      >
        Prev
      </button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
