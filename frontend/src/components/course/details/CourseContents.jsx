import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import SubSection from "./SubSection";

const CourseContents = ({sectionName,subSection}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${
        open ? "max-h-[1000px]" : "max-h-[65px]"
      } cursor-pointer transition-all duration-300 rounded-xl overflow-y-clip`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="flex items-center justify-between bg-[#a1a9fd]/[0.12] px-4 sm:px-7 py-5 rounded-xl text-xs 400px:text-sm">
        <div className="flex items-center gap-2">
          <FaChevronDown />{" "}
          <span className="font-semibold">{sectionName}</span>
        </div>
        <p className="text-richblack-700">{subSection.length} Lectures</p>
      </div>
      {subSection?.map(subSec=><SubSection key={subSec._id} title={subSec.title} open={open}/>)}
      
      
    </div>
  );
};

export default CourseContents;
