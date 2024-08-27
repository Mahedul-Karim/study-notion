import React from "react";
import HighlightText from "./HighlightText";

const Empty = ({ height="md:h-screen",showText=true }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${height}`} >
      <img alt="Empty" src="/assets/nodata.png" className="w-[80%] sm:w-[60%]"/>
      {showText && <p className="font-semibold text-sm md:text-lg"><HighlightText red>No Results found!</HighlightText> </p>}
    </div>
  );
};

export default Empty;
