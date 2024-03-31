import React from "react";
import HighlightText from "./HighlightText";

const Heading = ({ title1, highlightText, title2, textColor, extraClass="" }) => {
  return (
    <h2
      className={`${
        textColor ? textColor : "text-white"
      } font-bold text-3xl 400px:text-4xl ${extraClass}`}
    >
      {title1} <HighlightText blue> {highlightText}</HighlightText> {title2}
    </h2>
  );
};

export default Heading;
