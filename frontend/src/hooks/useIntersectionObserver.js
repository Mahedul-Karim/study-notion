import React, { useState } from "react";

const useIntersectionObserver = () => {
  const [isSectionIntersecting, setIsSectionIntersecting] = useState(false);

  const observeSection = (section) => {
    const observer = new IntersectionObserver(
      (entry, observer) => {
        const { isIntersecting } = entry[0];

        if (isIntersecting) {
          setIsSectionIntersecting(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.3,
      }
    );
    observer.observe(section);
  };

  return {
    isIntersecting:isSectionIntersecting,
    observeSection,
  };
};

export default useIntersectionObserver;
