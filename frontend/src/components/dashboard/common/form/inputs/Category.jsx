import React from "react";
import Select from "../../../../ui/inputs/Select";
import { NAV_CATEGORY } from "../../../../util/data";

const Category = ({ register, errors }) => {
  return (
    <div>
      <label className="text-[15px] text-richblack-5 mb-1">
        Choose a Category
        <sup className="text-pink-200 ml-[2px] top-[-2px] text-base">*</sup>
      </label>
      <Select register={register}>
        <option>Choose a category</option>
        {NAV_CATEGORY.map((cat, i) => (
          <option key={i}>
            {cat.title}
          </option>
        ))}
      </Select>
      {errors?.category && (
        <p className="text-sm mt-2 text-pink-200">
          {errors?.category?.message}
        </p>
      )}
    </div>
  );
};

export default Category;
