import React from "react";

import { TIMELINE_DATA } from "../util/data";

const TimelineSection = () => {
  return (
    <>
      <div className="flex flex-col gap-14 dotted__line self-center">
        {TIMELINE_DATA.map((data, index) => (
          <div
            className="flex items-center gap-8 relative shrink-0"
            key={index}
          >
            <div className="bg-white shadow-md size-14 flex items-center justify-center rounded-full shrink-0">
              <img src={data.image} alt="" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold">{data.heading}</h3>
              <p className="text-richblack-600">{data.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 sm:top-[100%] sm:-translate-y-[60%] sm:left-[50%] sm:-translate-x-[50%] w-max grid grid-cols-1 sm:grid-cols-2 bg-green-700 z-[99999] py-2 sm:py-6 justify-items-center">
            <div className="flex items-center gap-4 sm:border-r sm:border-solid sm:border-green-300 px-4 mb-2 400px:mb-4 sm:mb-0">
                <h4 className="text-[16px] 400px:text-xl sm:text-3xl font-bold text-white basis-[20%]">10</h4>
                <p className="text-green-300 self-center text-[10px] 400px:text-[12px] sm:text-base basis-[40%]">YEARS EXPERIENCES</p>
            </div>
            <div className="flex items-center gap-4 sm:pl-4 sm:w-[90%]">
                <h4 className="text-[16px] 400px:text-xl sm:text-3xl font-bold text-white basis-[20%]">250</h4>
                <p className="text-green-300 self-center text-[10px] 400px:text-[12px] sm:text-base basis-[40%]">TYPES OF COURSES</p>
            </div>
            
        </div>
        <div className="img__bg relative z-[999]">
          <img
            src="/assets/TimelineImage.png"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </>
  );
};

export default TimelineSection;
