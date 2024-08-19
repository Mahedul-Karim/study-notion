import React, { useEffect, useRef } from "react";
import Widget from "./Widget";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const WIDGET_DATA = [
  {
    src: "/assets/pencil-icon.svg",
    text: "Online Courses",
    duration: 100,
    unit: "K",
    number: 10,
  },
  {
    src: "/assets/certificate-icon.svg",
    text: "Expert Tutors",
    duration: 10,
    unit: "+",
    number: 200,
  },
  {
    src: "/assets/cources-icon.svg",
    text: "Ceritified Courses",
    duration: 100,
    unit: "K+",
    number: 6,
  },
  {
    src: "/assets/gratuate-icon.svg",
    text: "Online Students",
    duration: 10,
    unit: "K+",
    number: 60,
  },
];

const CourseWidget = () => {
  const courseWidgetRef = useRef(null);

  const { isIntersecting, observeSection } = useIntersectionObserver();

  useEffect(() => {
    observeSection(courseWidgetRef.current);
  }, []);

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:-mt-[100px] ${
        isIntersecting && "slideUp"
      } opacity-0`}
      ref={courseWidgetRef}
    >
      {WIDGET_DATA.map((data, index) => (
        <Widget
          key={index}
          src={data.src}
          text={data.text}
          duration={data.duration}
          unit={data.unit}
          number={data.number}
        />
      ))}
    </div>
  );
};

export default CourseWidget;
