import React from "react";

const Section = ({ children, extraClass = "" }) => {
  return (
    <section
      className={`bg-background px-4 400px:px-8 py-6 border border-solid border-grey-5 rounded-xl ${extraClass}`}
    >
      {children}
    </section>
  );
};

export default Section;
