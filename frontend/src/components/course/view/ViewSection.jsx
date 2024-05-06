import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSection, setSubSection } from "../../../store/slices/course";

const ViewSection = ({ sectionName, subSection, index,setShowSidebar }) => {
  const { viewCourse } = useSelector((state) => state.course);

  const selectedSection = viewCourse?.selectedSection;

  const selectedSubSection = viewCourse?.selectedSubSection;

  const progress = viewCourse?.progress;

  const dispatch = useDispatch();

  const setActiveSubSection = (subIndex) => {
    if (selectedSection === index && selectedSubSection === subIndex) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className="overflow-clip transition-all duration-300"
      style={{
        height:
          selectedSection === index
            ? `${48 * (subSection.length + 1)}px`
            : "48px",
      }}
    >
      <div
        className="bg-richblack-600 flex items-center justify-between h-12 px-4 cursor-pointer"
        onClick={() => {
          if (selectedSection === index) {
            return;
          }
          dispatch(setSection(index));
          dispatch(setSubSection(0));
          setShowSidebar(false)
        }}
      >
        <p className="text-sm font-semibold">{sectionName}</p>
        <button className="text-xs">
          <FaChevronDown />{" "}
        </button>
      </div>
      {subSection.map((subSec, i) => (
        <div
          className={`${
            setActiveSubSection(i) ? "bg-yellow" : "bg-richblack-50"
          }  text-richblack-800 flex items-center border-b border-solid border-richblack-600 px-4 cursor-pointer h-12`}
          key={subSec._id}
          onClick={() => {
            dispatch(setSubSection(i));
            setShowSidebar(false);
          }}
        >
          <p className="text-sm font-semibold flex items-center gap-2">
            <input
              type="checkbox"
              readOnly
              className="accent-green-300"
              checked={progress?.completedVideos?.includes(
                subSec?.videoUrl?.url
              )}
            />{" "}
            {subSec.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ViewSection;
