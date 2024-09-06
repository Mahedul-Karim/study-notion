import React, { useState } from "react";
import CancelButton from "../CancelButton";
import FormButton from "../../../ui/inputs/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { editCourse, addNewCourse } from "../../../../store/slices/course";
import { useApi } from "../../../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../../hooks/useToast";

const CoursePublish = ({ setActive }) => {
  const dispatch = useDispatch();

  const [checked, setIsChecked] = useState(false);

  const { success, error, warning } = useToast();

  const navigate = useNavigate();

  const { newCourse } = useSelector((state) => state.course);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useApi({
    success: (data) => {
      success("Course published successfully");
      navigate("/dashboard/instructor/my-courses");
      dispatch(addNewCourse(null));
    },
    error: (err) => {
      error(err);
    },
  });

  const publishCourse = () => {
    const options = {
      method: "PUT",
      data: {
        courseId: newCourse._id,
      },
    };

    if (checked) {
      mutate({ endpoint: "course", options });
    } else {
      success("Course was saved as draft");
      navigate("/dashboard/instructor/my-courses");
    }
    queryClient.invalidateQueries({
      queryKey: ["instructorCourses"],
      type: "all",
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-bold">Publish Setting</h3>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          className="size-4 cursor-pointer accent-primary focus:outline-none"
          onChange={(e) => setIsChecked(e.target.checked)}
          id="publishId"
        />
        <label
          className="text-lg text-richblack-300 select-none cursor-pointer"
          htmlFor="publishId"
        >
          Make this course public
        </label>
      </div>
      <div className="flex items-center gap-2 self-end mt-4">
        <CancelButton
          onClick={() => {
            setActive(2);
          }}
        >
          Prev
        </CancelButton>
        <FormButton
          extraClass="!mt-0 bg-primary"
          onClick={publishCourse}
          disabled={isPending}
        >
          {isPending ? "Publishing..." : "Save"}
        </FormButton>
      </div>
    </div>
  );
};

export default CoursePublish;
