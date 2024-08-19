import React from "react";

const Toggle = ({extraClass=""}) => {
  return (
    <label className={`switch ${extraClass}`}>
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );
};

export default Toggle;
