import React from "react";
import Input from "../../../../ui/inputs/Input";

const Title = ({ register, errors }) => {
  
  return (
    <div>
      <Input
        label={"Course Title"}
        required
        placeholder={"Enter Course Title"}
        type={"text"}
        register={register}
      />
      {errors?.courseName && (
        <p className="text-sm mt-2 text-pink-200">{errors?.courseName?.message}</p>
      )}
    </div>
  );
};

export default Title;
