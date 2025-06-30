import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, yellow, to, extraClass = "", outline }) => {
  return (
    <Link
      className={`${
        yellow ? "bg-secondary text-white rounded-md" : "bg-primary rounded-md text-white"
      } px-2 400px:px-4 py-2 text-[14px] 400px:text-base 400px:py-3 font-semibold  flex items-center hover:scale-95 transition-all duration-200 ${extraClass} ${
        outline &&
        "bg-transparent border border-solid border-secondary !text-secondary !rounded-full hover:bg-secondary hover:!text-white"
      }`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default Button;
