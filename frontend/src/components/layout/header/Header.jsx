import React, { useEffect, useRef, useState } from "react";
import Container from "../Container";
import { Link, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import DotMenu from "../../ui/DotMenu";
import { useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";
import MobileNav from "./MobileNav";
import ConfirmationModal from "../../ui/modal/ConfirmationModal";
import { useLogout } from "../../../hooks/useLogout";
import Logo from "../../ui/Logo";
import { VscSignOut } from "react-icons/vsc";

const Header = () => {
  const containerRef = useRef(null);

  const [active, setActive] = useState(false);

  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const [showSidebar, setShowSidebar] = useState(false);

  const { showModal, setShowModal, logoutHandler, isPending } = useLogout();

  const location = useLocation();

  const isHomePage = location?.pathname === "/";

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <header
      className={`${
        active ? "bg-white shadow-md" : "bg-none"
      } fixed w-full transition-all duration-300 z-[12]
      ${!isHomePage && "bg-white shadow-md"}
      `}
    >
      <Container extraClass={"!py-3 flex items-center justify-between"}>
        <Logo />

        <NavBar extraClass="hidden md:flex" />
        <div className="flex items-center gap-2 md:gap-4 text-richblack-100 relative">
          {!user ? (
            <>
              <Link
                to={"/login"}
                className="bg-[#392C7D] px-3 py-2 text-sm rounded-full  text-white hidden md:block"
              >
                Sign In
              </Link>
              <Link
                to={"/signup"}
                className="bg-primary px-3 py-2 text-white rounded-full hidden md:block text-sm"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <img
                src={user?.image}
                alt=""
                className="size-9 rounded-full cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
              />
              <div className="relative">
                <DotMenu open={open} extraClass="top-[25px]">
                  <Link
                    to={
                      user?.accountType === "Student"
                        ? "/dashboard/user"
                        : "/dashboard/instructor"
                    }
                    className="flex items-center gap-1"
                    onClick={setOpen.bind(null, false)}
                  >
                    <RxDashboard className="text-lg" /> <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={setShowModal.bind(null, true)}
                    className="flex items-center gap-1"
                  >
                    <VscSignOut className="text-lg" />
                    Logout
                  </button>
                </DotMenu>
              </div>
            </>
          )}
          <div
            className={`w-8 bg-[#392C7D] h-[1.5px] cursor-pointer navMenu relative before:absolute before:bg-[#392C7D] before:w-[20px] before:-top-[10px] before:left-0 before:h-[1.5px] after:absolute after:bg-[#392C7D] after:w-[20px] after:h-[1.5px] after:top-[10px] after:right-0 before:transition-all before:duration-300 after:transition-all after:duration-300 block md:hidden ${
              showSidebar && "active"
            }`}
            onClick={() => setShowSidebar((prev) => !prev)}
            ref={containerRef}
          />
        </div>
      </Container>
      <MobileNav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {showModal && (
        <ConfirmationModal
          heading={"Are you sure?"}
          paragraph={"You will be logged out of your account."}
          btn1text={"Log Out"}
          onClick2={setShowModal.bind(null, false)}
          onClick1={logoutHandler}
          isPending={isPending}
        />
      )}
    </header>
  );
};
export default Header;
