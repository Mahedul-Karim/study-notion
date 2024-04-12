import React from "react";

const TextArea = ({ placeholder,register }) => {
  return (
    <textarea
      className="bg-richblack-700 text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-richblack-500 disabled:cursor-not-allowed text-richblack-25"
      rows={5}
      placeholder={placeholder}
      {...register}
    />
  );
};

export default TextArea;
