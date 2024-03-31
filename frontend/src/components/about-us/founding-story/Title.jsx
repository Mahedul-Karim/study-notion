import React from "react";
import HighlightText from "../../ui/HighlightText";

const Title = ({ children, blue, red, orange, extraClass }) => {
  return (
    <h3 className={`text-4xl font-semibold ${extraClass}`}>
      <HighlightText red={red} blue={blue} orange={orange}>
        {children}
      </HighlightText>
    </h3>
  );
};

export default Title;
