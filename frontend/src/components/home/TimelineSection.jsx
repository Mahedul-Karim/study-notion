import React, { useEffect, useRef } from "react";

import { TIMELINE_DATA } from "../util/data";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const TimelineSection = () => {
  const sectionRef = useRef(null);

  const { isIntersecting, observeSection } = useIntersectionObserver();

  useEffect(() => {
    observeSection(sectionRef.current);
  }, []);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 mt-10 justify-items-center"
      ref={sectionRef}
    >
      <div
        className={`flex flex-col gap-14 dotted__line self-center ${
          isIntersecting && "slideLeft"
        } opacity-0`}
      >
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
      <div className={`relative ${isIntersecting && "slideRight"} opacity-0`}>
        <div className="absolute top-0 left-0 sm:top-[100%] sm:-translate-y-[60%] sm:left-[50%] sm:-translate-x-[50%] w-max grid grid-cols-1 sm:grid-cols-2 bg-green-700 z-[9] py-2 sm:py-6 justify-items-center">
          <div className="flex items-center gap-4 sm:border-r sm:border-solid sm:border-green-300 px-4 mb-2 400px:mb-4 sm:mb-0">
            <h4 className="text-[16px] 400px:text-xl sm:text-3xl font-bold text-white basis-[20%]">
              10
            </h4>
            <p className="text-green-300 self-center text-[10px] 400px:text-[12px] sm:text-base basis-[40%]">
              YEARS EXPERIENCES
            </p>
          </div>
          <div className="flex items-center gap-4 sm:pl-4 sm:w-[90%]">
            <h4 className="text-[16px] 400px:text-xl sm:text-3xl font-bold text-white basis-[20%]">
              250
            </h4>
            <p className="text-green-300 self-center text-[10px] 400px:text-[12px] sm:text-base basis-[40%]">
              TYPES OF COURSES
            </p>
          </div>
        </div>
        <div className="img__bg relative z-[8]">
          <img
            src="/assets/TimelineImage.png"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
