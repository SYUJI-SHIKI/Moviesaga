import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationStyle: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const pageRange = 2; // 現在のページの前後に表示するページ数

    let startPage = Math.max(1, currentPage - pageRange);
    let endPage = Math.min(totalPages, currentPage + pageRange);

    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" onClick={(e) => handlePageClick(e, 1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => handlePageClick(e, i)}
            className={`p-8 text-2xl rounded-md ${
              i === currentPage ? 'bg-blue-500 text-white' : 'bg-transparent text-blue-500 hover:bg-gray-200'
            }`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" onClick={(e) => handlePageClick(e, totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={(e) => handlePageClick(e, currentPage - 1)} href="#" />
          </PaginationItem>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={(e) => handlePageClick(e, currentPage + 1)} href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationStyle;