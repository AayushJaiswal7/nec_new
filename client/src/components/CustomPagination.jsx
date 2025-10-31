import React from "react";

const CustomPagination = ({
    rowsPerPage,
    rowCount,
    onChangePage,
    currentPage,
}) => {
    const totalPages = Math.ceil(rowCount / rowsPerPage);
    const maxVisible = 5;

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }

        return pages;
    };

    const handleBack = () => {
        if (currentPage > 1) onChangePage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onChangePage(currentPage + 1);
    };

    return (
        <div className="w-full flex items-center justify-between px-3 py-2">
            {/* Previous Button */}
            <button
                onClick={handleBack}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-200
          ${currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                    }`}
            >
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
                {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                        <span key={index} className="px-2 text-gray-500 select-none">
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => onChangePage(page)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200
                ${currentPage === page
                                    ? "bg-secondaryColor text-primaryColor border-secondaryColor"
                                    : "bg-white text-gray-700 hover:bg-gray-100 "
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-200
          ${currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default CustomPagination;
