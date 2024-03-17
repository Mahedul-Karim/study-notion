import React from "react";

const Container = ({ children, extraClass }) => {
  return (
    <div className={`max-w-[1200px] mx-auto ${extraClass} py-5 400px:py-10 w-11/12`}>
      {children}
    </div>
  );
};

export default Container;
