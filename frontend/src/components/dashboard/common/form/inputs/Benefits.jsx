import React from "react";
import TextArea from "../../../../ui/inputs/TextArea";
import Label from "./Label";

const Benefits = ({ register, errors }) => {
  return (
    <div>
      <Label>Benefits of the Course</Label>
      <TextArea
        placeholder={"Enter Benefits of the Course"}
        register={register}
      />
      {errors?.whatYouWillLearn && (
        <p className="text-sm mt-2 text-pink-200">
          {errors?.whatYouWillLearn?.message}
        </p>
      )}
    </div>
  );
};

export default Benefits;
