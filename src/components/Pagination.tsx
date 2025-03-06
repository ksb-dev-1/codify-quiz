"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  //questionsLoading: boolean;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({
  //questionsLoading,
  currentPage,
  totalPages,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getVisiblePages = () => {
    const startPage = Math.floor((currentPage - 1) / 3) * 3 + 1;
    return [startPage, startPage + 1, startPage + 2].filter(
      (page) => page > 0 && page <= totalPages
    );
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1
              ? "cursor-not-allowed text-[#999]"
              : "cursor-pointer bg-primary text-white hover:bg-hover transition-colors"
          } border px-4 py-2 mx-1 rounded-custom`}
        >
          Prev
        </button>
        {getVisiblePages().map((visiblePage) => (
          <button
            key={visiblePage}
            onClick={() => handlePageChange(visiblePage)}
            className={`${
              currentPage === visiblePage
                ? "cursor-pointer bg-primary text-white hover:bg-hover"
                : "hover:bg-slate-200"
            } border px-4 py-2 mx-1 rounded-custom transition-colors`}
          >
            {visiblePage}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages
              ? "cursor-not-allowed text-[#999]"
              : "cursor-pointer bg-primary text-white hover:bg-hover transition-colors"
          } border px-4 py-2 mx-1 rounded-custom`}
        >
          Next
        </button>
      </div>
      {/* {questionsLoading ? (
        <div className="text-transparent">
          <button className="skeleton px-4 py-2 mx-1 border border-transparent rounded-custom">
            Prev
          </button>
          {[1, 2, 3].map((_, index) => (
            <button
              key={index}
              className="skeleton px-4 py-2 mx-1 border border-transparent rounded-custom"
            >
              {index}
            </button>
          ))}
          <button className="skeleton px-4 py-2 mx-1 border border-transparent rounded-custom">
            Next
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "cursor-not-allowed text-[#999]"
                : "cursor-pointer bg-primary text-white hover:bg-hover transition-colors"
            } border px-4 py-2 mx-1 rounded-custom`}
          >
            Prev
          </button>
          {getVisiblePages().map((visiblePage) => (
            <button
              key={visiblePage}
              onClick={() => handlePageChange(visiblePage)}
              className={`${
                currentPage === visiblePage
                  ? "cursor-pointer bg-primary text-white hover:bg-hover"
                  : "hover:bg-slate-200"
              } border px-4 py-2 mx-1 rounded-custom transition-colors`}
            >
              {visiblePage}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? "cursor-not-allowed text-[#999]"
                : "cursor-pointer bg-primary text-white hover:bg-hover transition-colors"
            } border px-4 py-2 mx-1 rounded-custom`}
          >
            Next
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Pagination;
