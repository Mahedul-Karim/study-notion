import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, yellow, to }) => {
  return (
    <Link
      className={`${
        yellow
          ? "bg-yellow text-black"
          : "bg-richblack-700 text-white"
      }  px-4 py-3 font-semibold rounded-md flex items-center hover:scale-95 transition-all duration-200`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default Button;
