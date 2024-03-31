import React from "react";

const HighlightText = ({ children, blue, red,orange }) => {
  return (
    <span
      className={`${
        blue && "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
      } 
      ${red && "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"}
      ${orange && "bg-gradient-to-b from-[#FF512F] to-[#F09819]"}
      bg-clip-text text-transparent`}
    >
      {" "}
      {children}
    </span>
  );
};

export default HighlightText;
