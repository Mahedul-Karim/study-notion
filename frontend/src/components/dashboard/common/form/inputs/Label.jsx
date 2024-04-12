import React from "react";

const Label = ({ children }) => {
  return (
    <label className="text-[15px] text-richblack-5 mb-1">
      {children}
      <sup className="text-pink-200 ml-[2px] top-[-2px] text-base">*</sup>
    </label>
  );
};

export default Label;
