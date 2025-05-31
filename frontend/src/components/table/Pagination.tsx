import React from "react";
import { Text } from "../typography";
import Link from "next/link";

type PaginationProps = {
  from: number;
  to: number;
  total: number;
  totalPage: number;
  currentPage: number;
  handleClick: (page: number) => void;
}

const Pagination = ({ from, to, total, totalPage = 0, currentPage = 1, handleClick }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <Text className="text-sm ">
            {"Showing "}
            <span className="font-medium">{from} </span>
            {"to "}
            <span className="font-medium">{to} </span>
            {"of "}
            <span className="font-medium">{total} </span>
            results
          </Text>
        </div>
        {
          totalPage && (<div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-xs"
              aria-label="Pagination"
            >
              <button
                onClick={() => currentPage - 1 && handleClick(currentPage - 1)}
                disabled={currentPage - 1 <= 0}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50  focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              {
                Array.from({ length: totalPage }, (_, index) => (
                  <button
                    // href="#"
                    onClick={() => handleClick(index + 1)}
                    aria-current="page"
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset   focus:outline-offset-0 ${currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white hover:bg-gray-50"}`}
                  >
                    {index + 1}
                  </button>
                ))
              }
              <button
                onClick={() => (currentPage + 1 <= totalPage) && handleClick(currentPage + 1)}
                disabled={currentPage == totalPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50  focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>)
        }
      </div>
    </div>
  );
};

export default Pagination;
