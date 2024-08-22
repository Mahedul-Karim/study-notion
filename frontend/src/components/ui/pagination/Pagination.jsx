import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { ITEMS_PER_PAGE } from "../../util/helpers";
import { usePagination } from "../../../hooks/usePagination";

const Pagination = ({ type, category, search }) => {
  const {
    totalItems,
    handleNextClick,
    handlePreviousClick,
    paginationButtons,
    activePage,
    totalPage,
  } = usePagination({ type, category, search });

  return (
    <>
      {totalItems > ITEMS_PER_PAGE && (
        <>
          <div className="group">
            <button
              className="bg-white w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] flex items-center justify-center p-2 border border-solid border-[#ffdeda] rounded-md transition-all duration-300 group-hover:bg-primary group-hover:text-white disabled:group-hover:bg-grey-5 disabled:group-hover:text-black disabled:bg-grey-5"
              disabled={activePage === 1}
              onClick={handlePreviousClick}
            >
              <IoChevronBackOutline />
            </button>
          </div>
          {paginationButtons}
          <div className="group">
            <button
              className="bg-white w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] flex items-center justify-center p-2 border border-solid border-[#ffdeda] rounded-md transition-all duration-300 group-hover:bg-primary group-hover:text-white disabled:group-hover:bg-grey-5 disabled:group-hover:text-black disabled:bg-grey-5"
              disabled={activePage === totalPage}
              onClick={handleNextClick}
            >
              <IoChevronForwardOutline />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Pagination;
