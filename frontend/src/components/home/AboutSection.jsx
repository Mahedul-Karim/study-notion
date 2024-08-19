import React, { useEffect, useRef } from "react";
import Heading from "../ui/Heading";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const AboutSection = () => {
  const containerRef = useRef();

  const { isIntersecting, observeSection } = useIntersectionObserver();

  useEffect(() => {
    observeSection(containerRef.current);
  }, []);

  return (
    <div
      className={`flex flex-col items-center mt-32 gap-4 opacity-0 ${
        isIntersecting && "slideUp"
      }`}
      ref={containerRef}
    >
      <Heading
        title1={"Your swiss knife for"}
        highlightText={"learning any language"}
        title2={""}
        textColor={"text-richblack-700"}
      />
      <p className="text-richblack-600 text-center w-[75%]">
        Using spin making learning multiple languages easy. with 20+ languages
        realistic voice-over, progress tracking, custom schedule and more.
      </p>
      <div className="flex items-center justify-center flex-col 400px:flex-row">
        <img
          src="/assets/Know_your_progress.png"
          alt=""
          className={`400px:-mr-32 w-full 400px:w-[52%] sm:w-[48%] md:w-[40%] object-cover opacity-0 ${
            isIntersecting && "img1"
          }`}
        />
        <img
          src="/assets/Compare_with_others.svg"
          alt=""
          className={`md:w-[40%] object-cover w-full 400px:w-[52%] sm:w-[48%] opacity-0 ${
            isIntersecting && "img2"
          }`}
        />
        <img
          src="/assets/Plan_your_lessons.svg"
          alt=""
          className={`400px:-ml-36 w-full 400px:w-[52%] sm:w-[48%] md:w-[40%] object-cover opacity-0 ${
            isIntersecting && "img3"
          }`}
        />
      </div>
    </div>
  );
};

export default AboutSection;
