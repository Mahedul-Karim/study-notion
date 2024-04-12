import React from "react";

const ProgressBar = ({ width }) => {
  return (
    <div className="w-11/12 max-w-[200px] h-3 bg-richblack-700 rounded-md relative overflow-clip">
      <div
        className={`absolute top-0 left-0 h-full ${
          width < 100 ? "bg-blue-200" : "bg-green-300"
        }`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ProgressBar;
