import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, yellow, to, extraClass = "", outline }) => {
  return (
    <Link
      className={`${
        yellow ? "bg-tertiary text-white rounded-md" : "bg-richblack-700 rounded-md text-white"
      } px-2 400px:px-4 py-2 text-[14px] 400px:text-base 400px:py-3 font-semibold  flex items-center hover:scale-95 transition-all duration-200 ${extraClass} ${
        outline &&
        "bg-transparent border border-solid border-tertiary !text-tertiary !rounded-full hover:bg-tertiary hover:!text-white"
      }`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default Button;
