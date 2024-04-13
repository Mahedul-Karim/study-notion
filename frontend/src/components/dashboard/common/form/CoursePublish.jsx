import React, { useState } from "react";
import CancelButton from "../CancelButton";
import FormButton from "../../../ui/inputs/FormButton";
import { useDispatch } from "react-redux";
import { editCourse } from "../../../../store/slices/course";
import { toast } from "react-hot-toast";

const CoursePublish = ({ setActive }) => {
  const dispatch = useDispatch();

    const [checked,setIsChecked]=useState(false);

  const publishCourse = () => {
    dispatch(editCourse({ isDrift: !checked }));
    if (checked) {
      toast.success("Course published successfully");
    } else {
      toast.success("Course was saved as draft");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-bold">Publish Setting</h3>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          className="size-4 cursor-pointer accent-yellow focus:outline-none"
          onChange={(e) => setIsChecked(e.target.checked)}
          id="publishId"
        />
        <label className="text-lg text-richblack-300 select-none cursor-pointer" htmlFor="publishId">Make this course public</label>
      </div>
      <div className="flex items-center gap-2 self-end mt-4">
        <CancelButton
          onClick={() => {
            setActive(2);
          }}
        >
          Prev
        </CancelButton>
        <FormButton extraClass="!mt-0" onClick={publishCourse}>Save</FormButton>
      </div>
    </div>
  );
};

export default CoursePublish;
