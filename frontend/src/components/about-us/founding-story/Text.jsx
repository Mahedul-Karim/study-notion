import React from "react";

const Text = ({ children, extraClass }) => {
  return <p className={`text-richblack-300 mt-2 ${extraClass}`}>{children}</p>;
};

export default Text;
