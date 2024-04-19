import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import SubSection from "./SubSection";

const CourseContents = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-solid border-richblack-600 ${
        open ? "max-h-[1000px] overflow-visible" : "max-h-[65px] overflow-hidden"
      } cursor-pointer transition-all duration-300`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="flex items-center justify-between bg-richblack-700 px-4 sm:px-7 py-5">
        <div className="flex items-center gap-2">
          <FaChevronDown />{" "}
          <span className="text-base">Introduction to python</span>
        </div>
        <p className="text-yellow text-base">2 Lectures</p>
      </div>
      <SubSection />
      
    </div>
  );
};

export default CourseContents;
