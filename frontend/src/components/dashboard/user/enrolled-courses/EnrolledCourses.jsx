import React from "react";
import Heading from "../../common/Heading";
import Grid from "../../common/Grid";

import { useData } from "../../../../hooks/useData";
import Spinner from "../../../ui/Spinner";

const EnrolledCourses = () => {
  const { data, isPending } = useData({
    endpoint: "course/user/courses",
    key: ["userCourses"],
  });

  return (
    <>
      <Heading>Enrolled Courses</Heading>
      <div
        className="rounded-md overflow-x-auto hideScrollbar border border-solid border-border"
        id="gridItems"
      >
        <div className="min-w-[930px] grid grid-cols-[1.3fr_0.8fr_0.9fr_0.1fr] bg-background px-4 py-3 text-[15px]">
          <div>Course Name</div>
          <div>Duration</div>
          <div>Progress</div>
          
        </div>
        {isPending ? (
          <div className="flex items-center justify-center py-6">
            <Spinner />
          </div>
        ) : data?.courses?.length === 0 ? (
          <p className="text-center text-xl font-bold py-6">
            You have not enrolled in any courses
          </p>
        ) : (
          data?.courses?.map((course) => (
            <Grid
              key={course._id}
              thumbnail={course.thumbnail.url}
              name={course.courseName}
              description={course.courseDescription}
              progress={data?.courseProgress}
              courseId={course._id}
              course={course}
            />
          ))
        )}
      </div>
    </>
  );
};

export default EnrolledCourses;
