import React from "react";

const Select = ({ children, register }) => {
  return (
    <select
      className="bg-white text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-border disabled:cursor-not-allowed border border-solid border-border text-richblack-700 capitalize"
      {...register}
    >
      {children}
    </select>
  );
};

export default Select;
