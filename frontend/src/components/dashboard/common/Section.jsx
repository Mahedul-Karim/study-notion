import React from "react";

const Section = ({ children, extraClass = "" }) => {
  return (
    <section
      className={`bg-richblack-800 px-4 400px:px-8 py-6 border-solid border-richblack-700 border rounded-md ${extraClass}`}
    >
      {children}
    </section>
  );
};

export default Section;
