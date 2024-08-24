import React from "react";

const DotMenu = ({ children, extraClass = "", open }) => {
  return (
    <div
      className={`absolute right-[10px] rounded-md bg-white border border-solid border-[#e9ecef] w-max min-w-[50px] text-richblack-700 flex flex-col ${extraClass} ${
        open ? "scale-100" : "scale-0"
      }  origin-top-right transition-all duration-200 [&_*]:transition-all [&_*]:duration-200 text-sm [&_*:hover]:bg-richblack-5 z-10`}
      id="dotMenu"
    >
      {children}
    </div>
  );
};

export default DotMenu;
