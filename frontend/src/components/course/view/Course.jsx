import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";

import { MdOutlineSlideshow } from "react-icons/md";
import Main from "./Main";

import { useApi } from "../../../hooks/useApi";

import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { setViewCourse, setSection } from "../../../store/slices/course";
import Container from "../../layout/Container";

const Course = () => {
  const [searchParam] = useSearchParams();

  const [showSidebar, setShowSidebar] = useState(false);

  const courseName = searchParam.get("course")?.replace("-", " ");

  const dispatch = useDispatch();

  const { mutate, isPending } = useApi({
    success: (data) => {
      dispatch(
        setViewCourse({ course: data.course, progress: data.courseProgress })
      );
    },
    error: (err) => {
      toast.error(err);
    },
  });

  useEffect(() => {
    const options = {
      method: "GET",
    };

    mutate({ endpoint: `course/view/${courseName}`, options });
    dispatch(setSection(0));
  }, []);

  return (
    <div className="py-20 bg-background">
    <Container extraClass="grid lg:grid-cols-[300px_1fr] gap-6 relative">
      <button
        className={`flex lg:hidden text-secondary bg-blue-5 size-10  items-center justify-center border border-solid border-border transition-all duration-300 ${
          showSidebar ? "translate-x-[250px]" : "translate-x-0"
        }`}
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        <MdOutlineSlideshow size={30} />
      </button>
      <Sidebar
        showSidebar={showSidebar}
        isPending={isPending}
        setShowSidebar={setShowSidebar}
      />
      <Main isPending={isPending} />
    </Container>
    </div>
  );
};

export default Course;
