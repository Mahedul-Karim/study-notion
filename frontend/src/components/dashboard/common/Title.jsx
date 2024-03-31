import React from "react";

const Title = ({ children, extraClass = "" }) => {
  return <h4 className={`font-bold ${extraClass}`}>{children}</h4>;
};

export default Title;
