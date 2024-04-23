import React from "react";
import { FaChevronDown } from "react-icons/fa";

const ViewSection = ({ selectedSection, setSelectedSection }) => {
  return (
    <div
      className="overflow-clip transition-all duration-300"
      style={{
        height: selectedSection ? `${48 * 2}px` : "48px",
      }}
    >
      <div
        className="bg-richblack-600 flex items-center justify-between h-12 px-4 cursor-pointer"
        onClick={() => setSelectedSection((prev) => !prev)}
      >
        <p className="text-sm font-semibold">Section-1</p>
        <button className="text-xs">
          <FaChevronDown />{" "}
        </button>
      </div>
      <div className="bg-richblack-50 text-richblack-800 flex items-center border-b border-solid border-richblack-600 h-12 px-4 cursor-pointer">
        <p className="text-sm font-semibold flex items-center gap-2">
          <input type="checkbox" readOnly className="accent-green-300" />{" "}
          Lecture-1
        </p>
      </div>
    </div>
  );
};

export default ViewSection;
