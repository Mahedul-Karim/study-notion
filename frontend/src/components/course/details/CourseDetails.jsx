import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../layout/Container";
import Ratings from "../../ui/Ratings";
import CourseContents from "./CourseContents";
import Spinner from "../../ui/Spinner";

import Action from "./Action";
import Reviews from "./Reviews";

import { useData } from "../../../hooks/useData";

import { formatDate } from "../../util/format";

const CourseDetails = () => {
  const { courseName } = useParams();

  const courseTitle = courseName?.replace("-", " ");

  const { data, isPending } = useData({
    key: ["courseDetails", courseTitle],
    endpoint: `course/${courseTitle}`,
  });

  const courseDetails = data?.courseDetails;

  let totalReview;

  if (courseDetails?.ratingAndReviews.length === 0) {
    totalReview = 0;
  }

  const courseContents = courseDetails?.courseContents?.map((c) => c);

  const courseLectures = courseContents?.flatMap((c) => c?.subSection);

  if (isPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative before:absolute before:top-0 before:left-0 before:z-[-1] 400px:before:h-[400px] before:h-[500px] before:bg-richblack-800 before:w-full py-8">
      <Container extraClass="grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px] gap-4 text-white">
        <div>
          <div className="flex flex-col gap-3 mb-10">
            <h1 className="text-4xl text-white font-bold capitalize">
              {courseTitle}
            </h1>
            <p className="text-richblack-300">
              {courseDetails?.courseDescription}
            </p>
            <div className="flex flex-col 400px:flex-row 400px:items-center gap-2 text-[18px]">
              <span className="text-yellow">{totalReview}</span>
              <p className="flex items-center">
                <Ratings size={20} rating={totalReview} />{" "}
              </p>
              <p className="text-white">
                ({courseDetails?.ratingAndReviews?.length} ratings)
              </p>
              <p className="text-richblack-300">
                {courseDetails?.studentsEnrolled?.length} students enrolled
              </p>
            </div>
            <p className="text-lg">
              Created by{" "}
              <span className="text-yellow">
                {courseDetails?.instructor?.firstName +
                  " " +
                  courseDetails?.instructor?.lastName}
              </span>
            </p>
            <p className="text-richblack-100 text-lg">
              Created at{" "}
              <span>
                {courseDetails?.createdAt
                  ? formatDate(new Date(courseDetails?.createdAt))
                  : formatDate(new Date())}
              </span>
            </p>
          </div>
          <div className="p-6 border border-solid border-richblack-200 mt-32">
            <h2 className="text-3xl font-bold">What you&apos;ll learn</h2>
            <p className="mt-4">{courseDetails?.whatYouWillLearn}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <h2 className="text-3xl font-bold">Course Content</h2>
            <div>
              <p>
                {courseContents?.length} Section(s) {courseLectures?.length}{" "}
                Lecture(s)
              </p>
            </div>
            <div>
              {courseContents?.map((course) => (
                <CourseContents
                  key={course._id}
                  sectionName={course.sectionName}
                  subSection={course.subSection}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 p-4 border border-solid border-richblack-200">
            <h2 className="text-3xl font-bold">Reviews</h2>
            <div className="flex items-center gap-2 mb-6">
              <p className="text-2xl font-semibold">{totalReview}/5</p>
              <p className="text-richblack-200 text-sm">
                ({courseDetails?.ratingAndReviews?.length} ratings)
              </p>
            </div>
            {courseDetails?.ratingAndReviews?.length > 0 && (
              <div className="flex flex-col gap-8">
                <Reviews />
              </div>
            )}
          </div>
        </div>
        <Action
          thumbnail={courseDetails?.thumbnail?.url}
          price={courseDetails?.price}
          instructorId={courseDetails?.instructor?._id}
          instructions={courseDetails?.instructions}
        />
      </Container>
    </div>
  );
};

export default CourseDetails;
