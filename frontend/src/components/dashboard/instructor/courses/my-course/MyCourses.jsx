import React from "react";
import FormButton from "../../../../ui/inputs/FormButton";
import { useNavigate } from "react-router-dom";
import CourseTable from "./CourseTable";
import { useData } from "../../../../../hooks/useData";
import Spinner from "../../../../ui/Spinner";
import { useInsctructorCourses } from "../../../../../hooks/useInsctructorCourses";

const MyCourses = () => {
  const navigate = useNavigate();

  const { data, isPending } = useInsctructorCourses();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-[22px] 400px:text-3xl font-bold">My Courses</h3>
        <FormButton
          extraClass="!mt-0"
          onClick={() => navigate("/dashboard/instructor/add-course")}
        >
          Add Course
        </FormButton>
      </div>
      <div className="border border-solid border-richblack-700 mt-4 400px:mt-10">
        <div className="hidden md:grid grid-cols-[1fr_80px_80px] px-4 py-2 uppercase border-b border-solid border-richblack-700 text-[15px]">
          <h4>Courses</h4>
          <h4>Price</h4>
          <h4>Actions</h4>
        </div>
        {isPending ? (
          <div className="flex items-center justify-center p-6 text-2xl">
            <Spinner />
          </div>
        ) : data?.courses?.length === 0 ? (
          <div className="flex items-center justify-center p-6 text-2xl">
            No courses found
          </div>
        ) : (
          data?.courses.map((course) => (
            <CourseTable key={course?._id} course={course} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;
