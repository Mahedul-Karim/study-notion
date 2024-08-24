import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const FaqDropdown = ({
  index,
  activeIndex,
  title,
  desc1,
  desc2,
  setActiveIndex,
}) => {
  return (
    <div className="relative bg-white p-[15px] rounded-xl border border-solid border-border cursor-pointer overflow-clip h-fit">
      <div
        className="flex items-center justify-between"
        onClick={() => {
          if (activeIndex === index) {
            setActiveIndex(0);
          } else {
            setActiveIndex(index);
          }
        }}
      >
        <p className="text-richblack-700 font-semibold">{title}</p>
        <button>{activeIndex === index ? <FaMinus /> : <FaPlus />}</button>
      </div>
      <div
        className={`flex flex-col gap-4 transition-all duration-300 ${
          index === activeIndex
            ? "py-4 max-h-[1000px] visible"
            : "py-0 max-h-0 invisible"
        }`}
      >
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </div>
  );
};

export default FaqDropdown;
