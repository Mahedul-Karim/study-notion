import React from "react";

const Container = ({ children, extraClass }) => {
  return (
    <div className={`max-w-[1200px] mx-auto ${extraClass} px-3 py-5 400px:px-5 400px:py-10`}>
      {children}
    </div>
  );
};

export default Container;
