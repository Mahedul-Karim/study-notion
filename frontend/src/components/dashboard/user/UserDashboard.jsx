import React from "react";
import { Outlet } from "react-router-dom";

import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaGraduationCap } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import Sidebar from "../common/Sidebar";
import Container from "../../layout/Container";
import { FaRegHeart } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";


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
  {
    id: 3,
    to: "/dashboard/user/wishlist",
    title: "Wishlist",
    icon: <FaRegHeart fontSize={20} />,
  },
  {
    id: 3.5,
    to: "/dashboard/user/chats",
    title: "Chat",
    icon: <IoChatbubbleOutline fontSize={20} />,
  },
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
    <div className="py-20 bg-background">
      <Container extraClass="grid lg:grid-cols-[250px_1fr] gap-6">
        <Sidebar dashboardLinks={USER_DASHBOARD_LINKS} />
        <div className="overflow-x-scroll w-full hideScrollbar bg-white rounded-xl border border-solid border-border p-4 lg:p-6">
          <div className="text-richblack-700 flex flex-col gap-6">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserDashboard;
