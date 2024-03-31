import React from "react";
import { OVERVIEW_DATA } from "../util/data";

const Overview = () => {
  return (
    <>
      {OVERVIEW_DATA.map((data, i) => (
        <div className="flex flex-col items-center" key={i}>
          <h4 className="text-white text-3xl font-bold">{data.heading}</h4>
          <p className="text-richblack-400 font-bold">{data.text}</p>
        </div>
      ))}
    </>
  );
};

export default Overview;
