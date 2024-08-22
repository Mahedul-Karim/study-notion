import React from "react";
import { NAV_CATEGORY } from "../../util/data";
import { IoChevronDown } from "react-icons/io5";

const Dropdown = ({ openDropdown, category, setCategory, setOpen,open }) => {
  return (
    <div
      className="w-max flex items-center justify-center bg-primary text-white md:px-6 px-3 md:py-3 py-2 md:text-base text-sm rounded-full font-[500] gap-1 cursor-pointer relative capitalize whitespace-nowrap"
      onClick={openDropdown}
    >
      {category} <IoChevronDown />
      <div
        className={`bg-white border-solid border border-[#e9ecef] absolute w-max bottom-[-150px] sm:bottom-[-165px] left-[10px] !z-[12] origin-top-left ${
          open ? "scale-100" : "scale-0"
        } transition-all duration-300`}
      >
        {NAV_CATEGORY.slice(1).map((nav, i) => (
          <p
            key={i}
            className="text-richblack-700 p-2 capitalize border-b border-solid border-[#e9ecef] dropdown"
            onClick={() => {
              setCategory(nav.title);
              setOpen(false);
            }}
          >
            {nav.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
