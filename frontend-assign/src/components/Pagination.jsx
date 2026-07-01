function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (totalItems === 0) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Users pagination">
      <p className="pagination-info">
        Showing {startItem}-{endItem} of {totalItems} users
      </p>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            className={`pagination-button ${
              page === currentPage ? "is-active" : ""
            }`}
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-button"
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

export default Pagination;