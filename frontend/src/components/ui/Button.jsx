import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, yellow, to,extraClass="" }) => {
  return (
    <Link
      className={`${
        yellow
          ? "bg-yellow text-black"
          : "bg-richblack-700 text-white"
      } px-2 400px:px-4 py-2 text-[14px] 400px:text-base 400px:py-3 font-semibold rounded-md flex items-center hover:scale-95 transition-all duration-200 ${extraClass}`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default Button;
