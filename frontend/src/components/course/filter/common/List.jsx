import React from "react";
import { IoCheckmark } from "react-icons/io5";

const List = ({ i, value, checkId, label, query, onChange }) => {
  return (
    <li key={i} className="flex items-center gap-2 relative">
      <input
        type="checkbox"
        id={`${checkId}-${i}`}
        className="absolute size-8 opacity-0 cursor-pointer"
        value={`${value}`}
        onChange={onChange}
      />
      <span
        className={`size-4 flex items-center justify-center border border-solid ${
          query === value ? "border-primary " : "border-richblack-100"
        } rounded-full cursor-pointer`}
      >
        {query === value && (
          <IoCheckmark
            size={10}
            color="#ff4667"
            style={{
              strokeDasharray: "3px",
            }}
          />
        )}
      </span>
      <label
        htmlFor={`${checkId}-${i}`}
        className="capitalize cursor-pointer text-richblack-600 400px:text-base text-sm"
      >
        {label}
      </label>
    </li>
  );
};

export default List;
