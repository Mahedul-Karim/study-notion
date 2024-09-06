import React from "react";
import { Outlet } from "react-router-dom";

import { FaPlus } from "react-icons/fa6";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { BsGear } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import Sidebar from "../common/Sidebar";
import { RiComputerLine } from "react-icons/ri";
import Container from "../../layout/Container";
import { IoChatbubbleOutline } from "react-icons/io5";
import Fallback from '../../../routes/Fallback'

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
    id: 2.5,
    to: "/dashboard/instructor/chats",
    title: "Chat",
    icon: <IoChatbubbleOutline fontSize={20} />,
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
    <div className="py-20 bg-background">
      <Container extraClass="grid lg:grid-cols-[250px_1fr] gap-6">

      <Sidebar dashboardLinks={INSTRUCTOR_DASHBOARD_LINKS} />
      <div className="overflow-x-scroll w-full hideScrollbar bg-white rounded-xl border border-solid border-border p-4 lg:p-6">
        <div className="text-richblack-700 flex flex-col gap-6">
          <Fallback>

          <Outlet />
          </Fallback>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default InstructorDashboard;
