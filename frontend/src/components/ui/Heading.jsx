import React from "react";
import HighlightText from "./HighlightText";

const Heading = ({ title1, highlightText, title2, textColor }) => {
  return (
    <h2
      className={`${
        textColor ? textColor : "text-white"
      } font-bold text-3xl 400px:text-4xl`}
    >
      {title1} <HighlightText> {highlightText}</HighlightText> {title2}
    </h2>
  );
};

export default Heading;
