import React from "react";

const Label = ({ children }) => {
  return (
    <label className="text-[15px] text-richblack-700 mb-1">
      {children}
      <sup className="text-primary ml-[2px] top-[-2px] text-base">*</sup>
    </label>
  );
};

export default Label;
