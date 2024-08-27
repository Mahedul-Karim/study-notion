import React from "react";

import { IoIosCheckmarkCircle } from "react-icons/io";
const Tracking = ({ track, active }) => {
  return (
    <>
      {Number.isInteger(track.id) && (
        <div
          className={`size-9  border border-dashed  rounded-full ${
            active === track.number
              ? "border-primary bg-primary text-white"
              : "bg-transparent border-primary"
          } ${
            active > track.number && "border-0 bg-primary text-primary"
          } flex items-center justify-center `}
        >
          {active > track.number ? (
            <IoIosCheckmarkCircle className="w-full h-full" />
          ) : (
            <span className="text-[17px]">{track.number}</span>
          )}
        </div>
      )}
      {!Number.isInteger(track.id) && (
        <div
          className={`h-[0.25px] w-[25%] border border-dashed  ${
            active > track.number ? "border-primary" : "border-richblack-300"
          }`}
        ></div>
      )}

      {/* <div className='size-9 bg-richblack-800 border border-solid border-richblack-500 rounded-full'></div>
            <div className='h-[0.25px] w-[33%] border border-dashed border-richblack-500'></div>
            <div className='size-9 bg-richblack-800 border border-solid border-richblack-500 rounded-full'></div>
            <div className='h-[0.25px] w-[33%] border border-dashed border-richblack-500'></div>
            <div className='size-9 bg-richblack-800 border border-solid border-richblack-500 rounded-full'></div> */}
    </>
  );
};

export default Tracking;
