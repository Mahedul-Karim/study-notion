import React from "react";
import { FaVideo } from "react-icons/fa6";

const SubSection = ({ title }) => {
  return (
    <div
      className={`px-4 sm:px-7 py-5 border-b border-border border-solid flex items-center gap-2  transition-all duration-300 ${open ? 'visible' : 'invisible'} text-xs 400px:text-sm`}
    >
      <FaVideo /> {title}
    </div>
  );
};

export default SubSection;
