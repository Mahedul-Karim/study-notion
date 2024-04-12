import React from "react";

const DotMenu = ({ children, extraClass = "", open }) => {
  return (
    <div
      className={`absolute top-[40px] right-[10px] rounded-md bg-richblack-800 border border-solid border-richblack-700 w-max min-w-[50px] text-richblack-100 flex flex-col ${extraClass} ${
        open ? "scale-100" : "scale-0"
      }  origin-top-right transition-all duration-200 [&_*]:transition-all [&_*]:duration-200 text-sm [&_*:hover]:bg-richblack-700 [&_*:hover]:text-richblack-25`}
      id="dotMenu"
    >
      {children}
    </div>
  );
};

export default DotMenu;
