import React from "react";

const FilterCard = ({ children, extraClass = "" }) => {
  return (
    <div
      className={`rounded-md p-4 bg-white border border-solid border-[#f1f2ff] ${extraClass}`}
    >
      {children}
    </div>
  );
};

export default FilterCard;
