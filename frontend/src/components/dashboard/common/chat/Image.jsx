import React from "react";
import { useSelector } from "react-redux";

const Image = ({ size,isActive,src,showStatus=true }) => {
  

  return (
    <div className={`relative ${size ? size : "size-10"}`}>
      <img
        src={src}
        alt=""
        className="w-full h-full rounded-full object-cover"
      />
      {showStatus && <span className={`absolute bottom-0 right-0 size-3 rounded-full  ${isActive ?"bg-[rgb(6_214_160)]" : "bg-richblack-100"}`} />}
    </div>
  );
};

export default Image;
