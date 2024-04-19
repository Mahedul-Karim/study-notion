import React from "react";
import { FaVideo } from "react-icons/fa6";

const SubSection = () => {
  return (
    <div
      className={`px-4 sm:px-7 py-5 text-base flex items-center gap-2 border border-solid border-richblack-600 transition-all duration-300`}
    >
      <FaVideo /> Lecture 1
    </div>
  );
};

export default SubSection;
