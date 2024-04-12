import React from "react";
import { Outlet } from "react-router-dom";

import { FaPlus } from "react-icons/fa6";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { BsGear } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import Sidebar from "../common/Sidebar";
import { RiComputerLine } from "react-icons/ri";

const INSTRUCTOR_DASHBOARD_LINKS = [
  {
    id: 1,
    to: "/dashboard/instructor",
    title: "My Profile",
    icon: <HiOutlineUserCircle fontSize={24} />,
  },
  {
    id: 2,
    to: "/dashboard/instructor/analytics",
    title: "Dashboard",
    icon: <RxDashboard fontSize={20} />,
  },
  {
    id: 3,
    to: "/dashboard/instructor/my-courses",
    title: "My Courses",
    icon: <RiComputerLine fontSize={20} />,
  },
  {
    id: 3.5,
    to: "/dashboard/instructor/add-course",
    title: "Add Course",
    icon: <FaPlus fontSize={20} />,
  },
  {
    id: 4,
    to: "/dashboard/instructor/settings",
    title: "Settings",
    icon: <BsGear fontSize={20} />,
  },

  {
    id: 5,
    title: "Logout",
    icon: <VscSignOut fontSize={24} />,
  },
];

const InstructorDashboard = () => {
  return (
    <div className="min-h-[calc(100vh_-_70px)] grid  lg:grid-cols-[250px_1fr]">
      <Sidebar dashboardLinks={INSTRUCTOR_DASHBOARD_LINKS} />
      <div className="py-5 400px:py-8 overflow-x-scroll w-full hideScrollbar">
        <div className="text-richblack-25 flex flex-col gap-4 w-11/12 mx-auto max-w-[1000px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
