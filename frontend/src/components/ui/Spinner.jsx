import React from "react";

const Spinner = ({ button, height = "60px", width = "30px" }) => {
  return <div className="loader" style={{ width, height }}></div>;
};

export default Spinner;
