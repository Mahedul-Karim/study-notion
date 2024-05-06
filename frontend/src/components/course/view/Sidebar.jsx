import React, { useEffect, useMemo, useState } from "react";

import { FaChevronLeft, FaChevronDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import FormButton from "../../ui/inputs/FormButton";
import ViewSection from "./ViewSection";

import Spinner from "../../ui/Spinner";
import { useSelector } from "react-redux";

const Sidebar = ({ showSidebar, isPending,setShowSidebar }) => {
  const { viewCourse } = useSelector((state) => state.course);

  const navigate = useNavigate();

  const course = viewCourse?.course;

  const courseProgress = viewCourse?.progress;

  const courseContents = course?.courseContents?.map((c) => c);

  const courseLectures = courseContents?.flatMap((c) => c?.subSection);

  return (
    <aside
      className={`transition-all duration-300 z-20  w-[250px] absolute  lg:w-auto lg:static flex flex-col gap-2 px-4 bg-richblack-800 border-r border-richblack-700 border-solid py-6 text-richblack-5 ${
        showSidebar ? "translate-x-0" : "-translate-x-[100%]"
      } lg:translate-x-0`}
    >
      <div className="flex items-center justify-between">
        <button
          className="text-richblack-700 bg-richblack-100 size-8 text-xl rounded-full flex items-center justify-center"
          onClick={navigate.bind(null, -1)}
        >
          <FaChevronLeft />{" "}
        </button>
        <FormButton extraClass="mt-0">Review</FormButton>
      </div>
      {isPending ? (
        <div className="flex items-center justify-center py-6">
          <Spinner />
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">My Courses</h2>
            <p className="text-sm text-richblack-400 font-bold">
              {courseProgress?.completedVideos?.length} of{" "}
              {courseLectures?.length} Lectures Completed
            </p>
          </div>
          <hr className="text-richblack-500 mt-5 mb-2" />
          <div className="flex flex-col gap-2">
            {courseContents?.map((course, i) => (
              <ViewSection
                key={course._id}
                sectionName={course?.sectionName}
                subSection={course.subSection}
                index={i}
                setShowSidebar={setShowSidebar}
              />
            ))}
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
