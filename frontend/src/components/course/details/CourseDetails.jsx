import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../layout/Container";
import Ratings from "../../ui/Ratings";
import CourseContents from "./CourseContents";

import Action from "./Action";
import Reviews from "./Reviews";

const CourseDetails = () => {
  const { courseName } = useParams();
  return (
    <div className="relative before:absolute before:top-0 before:left-0 before:z-[-1] 400px:before:h-[400px] before:h-[500px] before:bg-richblack-800 before:w-full py-8">
      <Container extraClass="grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px] gap-4 text-white">
        <div>
          <div className="flex flex-col gap-3 mb-10">
            <h1 className="text-4xl text-white font-bold capitalize">
              {courseName?.replace("-", " ")}
            </h1>
            <p className="text-richblack-300">
              The Python Basics course is designed for beginners who want to
              learn the fundamentals of Python programming. Explore the core
              concepts of Python, including variables, data types, control flow,
              loops, functions, and more.
            </p>
            <div className="flex flex-col 400px:flex-row 400px:items-center gap-2 text-[18px]">
              <span className="text-yellow">4.5</span>
              <p className="flex items-center">
                <Ratings size={20} rating={2.5} />{" "}
              </p>
              <p className="text-white">(4 ratings)</p>
              <p className="text-richblack-300">10 students enrolled</p>
            </div>
            <p className="text-lg">
              Created by <span className="text-yellow">Some One</span>
            </p>
            <p className="text-richblack-100 text-lg">
              Created at <span>June 24, 2023</span>
            </p>
          </div>
          <div className="p-6 border border-solid border-richblack-200 mt-32">
            <h2 className="text-3xl font-bold">What you&apos;ll learn</h2>
            <p className="mt-4">
              Beginner-Friendly: Python&apos;s intuitive syntax and readability
              make it an excellent choice for beginners entering the world of
              programming.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <h2 className="text-3xl font-bold">Course Content</h2>
            <div>
              <p>5 Section(s) 7 Lecture(s)</p>
            </div>
            <div>
              <CourseContents />
              <CourseContents />
              <CourseContents />
              <CourseContents />
              <CourseContents />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 p-4 border border-solid border-richblack-200">
            <h2 className="text-3xl font-bold">Reviews</h2>
            <div className="flex items-center gap-2 mb-6">
              <p className="text-2xl font-semibold">4.5/5</p>
              <p className="text-richblack-200 text-sm">(2 ratings)</p>
            </div>
            <div className="flex flex-col gap-8">
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
            </div>
          </div>
        </div>
        <Action />
      </Container>
    </div>
  );
};

export default CourseDetails;
