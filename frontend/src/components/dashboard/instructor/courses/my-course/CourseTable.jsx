import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { formatCurrency, formatDate } from "../../../../util/format";
import ConfirmationModal from "../../../../ui/modal/ConfirmationModal";
import { useApi } from "../../../../../hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewCourse } from "../../../../../store/slices/course";
import { useToast } from "../../../../../hooks/useToast";

const CourseTable = ({ course }) => {
  const [openModal, setOpenModal] = useState(false);

  const { success, error, warning } = useToast();

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mutate, isPending } = useApi({
    success: (data) => {
      setOpenModal(false);
      success(data.message);
      queryClient.refetchQueries({
        queryKey: ["instructorCourses"],
        type: "active",
      });
    },
    error: (err) => {
      error(err);
    },
  });

  const courseDeleteHandler = () => {
    const options = {
      method: "DELETE",
    };
    mutate({ endpoint: `course/${course?._id}`, options });
  };

  const editCourse = () => {
    dispatch(addNewCourse(course));
    navigate("/dashboard/instructor/edit-course?isEditing=true");
  };

  return (
    <div
      className={`grid md:grid-cols-[1fr_80px_80px] px-4 py-4 border-b border-solid border-border`}
    >
      <div className="flex sm:flex-row flex-col gap-2">
        <img
          src={course?.thumbnail?.url}
          className="w-[220px] object-cover aspect-[16/9] rounded-md h-[150px]"
        />
        <div className="flex flex-col gap-1 justify-center">
          <h5 className="text-[18px] font-semibold">{course?.courseName}</h5>
          <p className="text-xs text-richblack-300">
            {course?.courseDescription?.length <= 110 ? course?.courseDescription : course?.courseDescription?.substring(0,110)+"..."}
          </p>
          <p className="text-xs">
            Created At: <span>{course?.createdAt ? formatDate(new Date(course?.createdAt)) : formatDate(new Date("2023-05-03T11:48:31.058Z"))}</span>
          </p>
          {course?.isDrift ? (
            <div
              className={`bg-primary/[0.15] px-2 py-1 rounded-full w-max flex items-center text-pink-200 text-xs gap-1`}
            >
              <FaClock /> Draft
            </div>
          ) : (
            <div
              className={`bg-green-300/[0.2] px-2 py-1 rounded-full w-max flex items-center text-green-700 text-xs gap-1`}
            >
              <FaCheckCircle /> Published
            </div>
          )}
        </div>
      </div>
      <div className="text-sm text-richblack-100 grid grid-cols-2 md:block mt-4 md:mt-0">
        <p className="md:hidden block text-base font-semibold">Price</p>
        <p className="text-richblack-600">{formatCurrency(course?.price)}</p>
      </div>
      <div className="grid grid-cols-2 md:block mt-4 md:mt-0">
        <p className="md:hidden block text-base font-semibold text-richblack-100">
          Actions
        </p>
        <div className="flex self-start gap-4">
          <button
            className="transition-all duration-300 hover:scale-[1.15] hover:text-green-300"
            onClick={editCourse}
          >
            <GoPencil size={22} />{" "}
          </button>
          <button
            className="transition-all duration-300 hover:scale-[1.15] hover:text-pink-200"
            onClick={setOpenModal.bind(null, true)}
          >
            <FaTrash size={20} />{" "}
          </button>
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          heading={"Are you sure?"}
          paragraph={"This action can not be undone"}
          btn1text={"Delete"}
          onClick2={setOpenModal.bind(null, false)}
          onClick1={courseDeleteHandler}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default CourseTable;
