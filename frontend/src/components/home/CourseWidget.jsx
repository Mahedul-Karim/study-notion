import React, { useEffect, useRef } from "react";
import Widget from "./Widget";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { WIDGET_DATA } from "../util/data";

const CourseWidget = () => {
  const courseWidgetRef = useRef(null);

  const { isIntersecting, observeSection } = useIntersectionObserver();

  useEffect(() => {
    observeSection(courseWidgetRef.current);
  }, []);

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${
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
