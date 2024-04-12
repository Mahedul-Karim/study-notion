import React from "react";
import TextArea from "../../../../ui/inputs/TextArea";
import Label from "./Label";

const Description = ({ register, errors }) => {
  return (
    <div>
      <Label>Course Description</Label>
      <TextArea placeholder={"Enter Course Description"} register={register} />
      {errors?.courseDescription && (
        <p className="text-sm mt-2 text-pink-200">
          {errors?.courseDescription?.message}
        </p>
      )}
    </div>
  );
};

export default Description;
