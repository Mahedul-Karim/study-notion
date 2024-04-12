import React from "react";

const Select = ({ children, register }) => {
  return (
    <select
      className="bg-richblack-700 text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-richblack-500 disabled:cursor-not-allowed text-richblack-25"
      {...register}
    >
      {children}
    </select>
  );
};

export default Select;
