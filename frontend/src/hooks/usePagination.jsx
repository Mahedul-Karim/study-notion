import React from "react";
import { ITEMS_PER_PAGE } from "../components/util/helpers";
import { useSearchParams } from "react-router-dom";
import { useData } from "./useData";

export const usePagination = ({ type, category,search }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isPending } = useData({
    key: [`pagination-${type}`, category,search],
    endpoint: `/${type}/count?category=${category}&search=${search}`,
  });

  const totalItems = data?.totalDocuments;

  const activePage = +searchParams.get("page") || 1;

  let previousPage = activePage - 1;
  let nextPage = activePage + 1;

  const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginationButtons = [];

  if (activePage === totalPage && totalPage > 10) {
    previousPage = previousPage - 1;
  }

  if (activePage === 1) {
    nextPage = nextPage + 1;
  }

  const handleClick = (num) => {
    searchParams.set("page", num);
    setSearchParams(searchParams);
  };

  for (let pageNum = previousPage; pageNum <= nextPage; pageNum++) {
    if (pageNum > totalPage) {
      break;
    }

    if (pageNum === 0) {
      pageNum = pageNum + 1;
    }

    let pages = (
      <div className="group" key={pageNum}>
        <button
          className={`w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] flex items-center justify-center p-2 border border-solid border-[#ffdeda] rounded-md hover:transition-all hover:duration-300 group-hover:bg-primary group-hover:text-white ${
            activePage === pageNum ? "bg-primary text-white" : "bg-white"
          }`}
          onClick={handleClick.bind(null, pageNum)}
        >
          {pageNum}
        </button>
      </div>
    );

    paginationButtons.push(pages);
  }

  const handleNextClick = () => {
    const next = activePage <= totalPage ? activePage + 1 : null;
    searchParams.set("page", next);
    setSearchParams(searchParams);
    console.log(totalItems);
  };

  const handlePreviousClick = () => {
    const prev = activePage === 1 ? activePage : activePage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  return {
    handleNextClick,
    handlePreviousClick,
    paginationButtons,
    totalItems,
    activePage,
    totalPage,
  };
};
