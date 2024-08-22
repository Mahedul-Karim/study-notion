import React from "react";

const Title = ({ children, extraClass = "" }) => {
  return (
    <h3 className={`font-semibold text-base 400px:text-lg text-richblack-500 ${extraClass}`}>
      {children}
    </h3>
  );
};

export default Title;
