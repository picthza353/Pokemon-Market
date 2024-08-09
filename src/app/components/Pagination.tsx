interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center my-4 ">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-100 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r"
      >
        Next
      </button>
    </div>
  );
}
