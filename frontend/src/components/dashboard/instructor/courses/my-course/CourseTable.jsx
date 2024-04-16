import React from "react";
import { FaTrash } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const CourseTable = () => {
  return (
    <div className={`grid md:grid-cols-[1fr_80px_80px] px-4 py-4 border-b border-solid border-richblack-700`}>
      <div className="flex sm:flex-row flex-col gap-2">
        <img
          src="https://api.dicebear.com/5.x/initials/svg?seed=Test User"
          className="w-[220px] object-cover aspect-[16/9] rounded-md"
        />
        <div className="flex flex-col gap-1 justify-center">
          <h5 className="text-[18px] font-semibold">Java</h5>
          <p className="text-xs text-richblack-300">
            The course will cover topics like exception handling, input/output
            operations, file handling, and basic GUI (Graphical User Interface)
            development using Java Swing. You will also delve into topics such
            as...
          </p>
          <p className="text-xs">
            Created At: <span>23 Mar,2023</span>
          </p>
          <div
            className={`bg-richblack-700 px-2 py-1 rounded-full w-max flex items-center text-yellow text-xs gap-1`}
          >
           <FaCheckCircle/> Published
          </div>
        </div>
      </div>
      <div className="text-sm text-richblack-100 grid grid-cols-2 md:block mt-4 md:mt-0">
        <p className="md:hidden block text-base font-semibold">Price</p>
        <p>$1000</p>
      </div>
      <div className="grid grid-cols-2 md:block mt-4 md:mt-0">
        <p className="md:hidden block text-base font-semibold text-richblack-100">
          Actions
        </p>
        <div className="flex self-start gap-4">
          <button className="transition-all duration-300 hover:scale-[1.15] hover:text-green-300">
            <GoPencil size={22} />{" "}
          </button>
          <button className="transition-all duration-300 hover:scale-[1.15] hover:text-pink-200">
            <FaTrash size={20} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
