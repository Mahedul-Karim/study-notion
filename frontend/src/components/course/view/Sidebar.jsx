import React, { useEffect, useMemo, useState } from "react";

import { FaChevronLeft, FaChevronDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import FormButton from "../../ui/inputs/FormButton";
import ViewSection from "./ViewSection";

import Spinner from "../../ui/Spinner";
import { useSelector } from "react-redux";
import ReviewModal from "../../ui/modal/ReviewModal";

const Sidebar = ({ showSidebar, isPending, setShowSidebar }) => {
  const { viewCourse } = useSelector((state) => state.course);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const course = viewCourse?.course;

  const courseProgress = viewCourse?.progress;

  const courseContents = course?.courseContents?.map((c) => c);

  const courseLectures = courseContents?.flatMap((c) => c?.subSection);

  return (
    <aside
      className={`transition-all duration-300  w-[250px] absolute  lg:w-auto lg:static flex flex-col gap-2 px-4 bg-white border border-solid border-border py-6 text-richblack-600 rounded-xl z-[11] ${
        showSidebar ? "translate-x-0" : "-translate-x-[200%]"
      } lg:translate-x-0 `}
    >
      <div className="flex items-center justify-between">
        <button
          className="text-white bg-primary size-8 text-xl rounded-full flex items-center justify-center"
          onClick={navigate.bind(null, -1)}
        >
          <FaChevronLeft />{" "}
        </button>
        <FormButton extraClass="!mt-0 bg-primary" onClick={setShowModal.bind(null, true)}>
          Review
        </FormButton>
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
          <hr className="text-border mt-5 mb-2" />
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
      {showModal && <ReviewModal setShowModal={setShowModal} />}
    </aside>
  );
};

export default Sidebar;
