import React, { useState } from "react";
import Container from "../Container";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import DotMenu from "../../ui/DotMenu";
import { useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";
import MobileNav from "./MobileNav";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <header
      className={`border-b border-solid border-richblack-700 bg-richblack-800`}
    >
      <Container extraClass={"!py-3 flex items-center justify-between"}>
        <img
          src="/assets/logo.png"
          height={42}
          width={160}
          loading="lazy"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
        <NavBar extraClass="hidden md:flex" />
        <div className="flex items-center gap-2 md:gap-4 text-richblack-100 relative">
          {user ? (
            <>
              {" "}
              <Link
                to={"/login"}
                className="bg-richblack-800 px-3 py-2 rounded-md border-2 border-solid border-richblack-700 hidden md:block"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="bg-richblack-800 px-3 py-2 rounded-md border-2 border-solid border-richblack-700 hidden md:block"
              >
                Signup
              </Link>{" "}
            </>
          ) : (
            <>
              <img
                src="https://api.dicebear.com/5.x/initials/svg?seed=Test User"
                alt=""
                className="size-9 rounded-full cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
              />
              <div className="relative">
                <DotMenu open={open} extraClass="top-[25px]">
                  <Link
                    to={"/dashboard/instructor"}
                    className="flex items-center gap-1"
                    onClick={setOpen.bind(null, false)}
                  >
                    <RxDashboard className="text-lg" /> <span>Dashboard</span>
                  </Link>
                  <Link to={"/dashboard/user"}>Logout</Link>
                </DotMenu>
              </div>
              <div
                className={`w-8 bg-white h-[1.5px] cursor-pointer navMenu relative before:absolute before:bg-white before:w-[20px] before:-top-[10px] before:left-0 before:h-[1.5px] after:absolute after:bg-white after:w-[20px] after:h-[1.5px] after:top-[10px] after:right-0 before:transition-all before:duration-300 after:transition-all after:duration-300 block md:hidden ${
                  showSidebar && "active"
                }`}
                onClick={() => setShowSidebar((prev) => !prev)}
              />
            </>
          )}
        </div>
      </Container>
      <MobileNav showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
    </header>
  );
};

export default Header;
