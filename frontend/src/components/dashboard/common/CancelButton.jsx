import React from "react";

const CancelButton = ({ children,onClick,extraClass }) => {
  return (
    <button
      className={`py-[7px] 400px:py-[8px] px-[8px] 400px:px-[12px] inline-block bg-richblack-700 rounded-lg font-medium text-[14px] 400px:text-base ${extraClass}`}
      type="button"
      onClick={onClick}
    >
      {children ? children : "Cancel"}
    </button>
  );
};

export default CancelButton;
