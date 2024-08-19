import React, { useEffect, useState } from "react";
import Container from "../Container";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import DotMenu from "../../ui/DotMenu";
import { useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";
import MobileNav from "./MobileNav";
import ConfirmationModal from "../../ui/modal/ConfirmationModal";
import { useLogout } from "../../../hooks/useLogout";
import Logo from "../../ui/Logo";

import { FaRegHeart, FaUser } from "react-icons/fa";
import Toggle from "../../ui/Toggle";

const Header = () => {
  const [active, setActive] = useState(false);

  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const [showSidebar, setShowSidebar] = useState(false);

  const { showModal, setShowModal, logoutHandler, isPending } = useLogout();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    });

    return () => window.removeEventListener("scroll", () => {});
  }, []);

  return (
    <header
      className={`${
        active ? "bg-white shadow-md" : "bg-none"
      } fixed w-full transition-all duration-300 z-[11]`}
    >
      <Container extraClass={"!py-3 flex items-center justify-between"}>
        <Logo />

        <NavBar extraClass="hidden md:flex" />
        <div className="flex items-center gap-2 md:gap-4 text-richblack-100 relative">
          {!user ? (
            <>
              <Link
                to={"/login"}
                className="bg-tertiary px-3 py-2 rounded-md text-white hidden md:block"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="bg-tertiary px-3 py-2 text-white rounded-md hidden md:block"
              >
                Signup
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
                  <button onClick={setShowModal.bind(null, true)}>
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
