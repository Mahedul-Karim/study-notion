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
  } else {
    totalReview = courseDetails?.ratingAndReviews?.reduce(
      (acc, item) => acc + item.rating,
      0
    );
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
    <div>
      <div className="py-[25px]" />
      <div className="bg-background bg-[url('/assets/inner-banner.jpg')] bg-no-repeat before:bg-black/[0.76] before:absolute before:top-0 before:left-0 py-3 before:w-full before:h-full relative bg-cover z-[-1]">
        <Container>
          <div className="relative z-[1] w-full md:w-[65%]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={courseDetails?.instructor?.image}
                  alt=""
                  className="size-10 400px:size-12 rounded-full object-cover border border-solid border-border"
                />
                <div className="flex flex-col">
                  <p className="text-richblack-5 font-semibold 400px:text-base text-sm">
                    {courseDetails?.instructor?.firstName +
                      " " +
                      courseDetails?.instructor?.lastName}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="flex items-center text-sm 400px:text-base">
                      <Ratings rating={totalReview} />{" "}
                    </p>
                    <span className="text-yellow text-sm">{totalReview}</span>
                    <p className="text-white text-sm hidden 400px:block">
                      ({courseDetails?.ratingAndReviews?.length} ratings)
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-white capitalize bg-primary text-sm 400px:text-base px-4 py-1 rounded-2xl">
                {courseDetails?.category}
              </div>
            </div>
            <div className="flex flex-col gap-3 ">
              <h1 className="text-base 400px:text-xl sm:text-3xl text-white font-semibold capitalize">
                {courseTitle}
              </h1>
              <p className="text-richblack-5 text-xs 400px:text-sm">
                {courseDetails?.courseDescription}
              </p>
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-background">
        <Container extraClass="grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px] gap-4">
          <div>
            <div className="p-4 400px:p-6 border border-solid border-border bg-white rounded-xl">
              <h2 className="text-base 400px:text-lg font-bold text-secondary ">
                What you&apos;ll learn
              </h2>
              <p className="mt-4 text-xs 400px:text-sm">{courseDetails?.whatYouWillLearn}</p>
            </div>
            <div className="bg-white mt-8 border border-border border-solid flex flex-col gap-3 p-4 400px:p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-base 400px:text-lg text-secondary font-bold">
                  Course Content
                </h2>

                <p className="text-xs 400px:text-sm font-semibold hidden 400px:block">
                  {courseContents?.length} Section(s) {courseLectures?.length}{" "}
                  Lecture(s)
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {courseContents?.map((course) => (
                  <CourseContents
                    key={course._id}
                    sectionName={course.sectionName}
                    subSection={course.subSection}
                  />
                ))}
              </div>
            </div>
            {courseDetails?.ratingAndReviews?.length > 0 && <div className="mt-8 flex flex-col gap-2 p-4 border border-solid border-border bg-white rounded-xl">
              <h2 className="text-lg text-secondary font-bold">Reviews</h2>
              
              { (
                <div className="flex flex-col gap-8">
                  {courseDetails?.ratingAndReviews.map((rating) => (
                    <Reviews
                      key={rating._id}
                      user={rating.user}
                      review={rating.reviews}
                      rating={rating.rating}
                    />
                  ))}
                </div>
              )}
            </div>}
          </div>
          <Action
            thumbnail={courseDetails?.thumbnail?.url}
            price={courseDetails?.price}
            instructorId={courseDetails?.instructor?._id}
            instructions={courseDetails?.instructions}
            courseId={courseDetails?._id}
          />
        </Container>
      </div>
    </div>
  );
};

export default CourseDetails;
