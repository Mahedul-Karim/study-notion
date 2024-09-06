import React from "react";

const ProgressBar = ({ width }) => {
  return (
    <div className="w-11/12 max-w-[200px] h-3 bg-richblack-50 rounded-md relative overflow-clip">
      <div
        className={`absolute top-0 left-0 h-full ${
          width < 100 ? "bg-tertiary" : "bg-[rgb(6_214_160)]"
        }`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ProgressBar;
