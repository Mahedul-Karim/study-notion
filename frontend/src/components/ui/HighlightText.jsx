import React from "react";

const HighlightText = ({ children }) => {
  return (
    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
      {" "}
      {children}
    </span>
  );
};

export default HighlightText;
