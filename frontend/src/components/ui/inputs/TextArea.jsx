import React from "react";

const TextArea = ({ placeholder,register }) => {
  return (
    <textarea
      className="bg-white border border-solid border-border text-base p-3 focus:outline-none rounded-lg w-full  relative disabled:bg-border disabled:cursor-not-allowed text-richblack-700"
      rows={5}
      placeholder={placeholder}
      {...register}
    />
  );
};

export default TextArea;
