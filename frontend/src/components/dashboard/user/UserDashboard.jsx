import React from "react";
import { Outlet } from "react-router-dom";

import { IoCartOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaGraduationCap } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import Sidebar from "../common/Sidebar";
const USER_DASHBOARD_LINKS = [
  {
    id: 1,
    to: "/dashboard/user",
    title: "My Profile",
    icon: <HiOutlineUserCircle fontSize={24} />,
  },
  {
    id: 2,
    to: "/dashboard/user/enrolled-courses",
    title: "Enrolled Courses",
    icon: <FaGraduationCap fontSize={24} />,
  },
  // {
  //   id: 3,
  //   to: "/dashboard/user/cart",
  //   title: "Cart",
  //   icon: <IoCartOutline fontSize={24} />,
  // },
  {
    id: 4,
    to: "/dashboard/user/settings",
    title: "Settings",
    icon: <BsGear fontSize={20} />,
  },
  {
    id: 5,
    title: "Logout",
    icon: <VscSignOut fontSize={24} />,
  },
];

const UserDashboard = () => {
  return (
    <div className="min-h-[calc(100vh_-_70px)] grid  lg:grid-cols-[250px_1fr]">
      <Sidebar dashboardLinks={USER_DASHBOARD_LINKS} />
      <div className="py-5 400px:py-8 overflow-x-scroll w-full hideScrollbar">
        <div className="text-richblack-25 flex flex-col gap-4 w-11/12 mx-auto max-w-[1000px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
