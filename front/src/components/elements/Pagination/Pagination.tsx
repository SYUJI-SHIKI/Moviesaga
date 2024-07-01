import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i} onClick={() => onPageChange(i + 1)}
          disabled={i + 1 === currentPage}
        >
          { i + 1 }
        </button>
      ))}
    </div>
  );
}

export default Pagination;