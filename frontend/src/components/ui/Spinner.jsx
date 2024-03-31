import React from "react";

const Spinner = ({ button }) => {
  return (
    <div
      id="spinner"
      className={`${
        button ? "size-[35px] border-y-[#001B22] border-x-[#0000]" : "w-[56px] h-[56px] border-y-[#dbdcef] border-x-[#0000]"
      } border-[4.5px] border-solid border-[#0000]`}
    />
  );
};

export default Spinner;
