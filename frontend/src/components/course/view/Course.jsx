import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";

import { MdOutlineSlideshow } from "react-icons/md";
import Main from "./Main";

const Course = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <section className="grid lg:grid-cols-[400px_1fr] gap-4 relative">
      <button
        className={`flex lg:hidden text-white bg-richblack-800 size-10  items-center justify-center border border-solid border-richblack-700 transition-all duration-300 ${
          showSidebar ? "translate-x-[250px]" : "translate-x-0"
        }`}
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        <MdOutlineSlideshow size={30} />
      </button>
      <Sidebar showSidebar={showSidebar} />
      <Main />
    </section>
  );
};

export default Course;
