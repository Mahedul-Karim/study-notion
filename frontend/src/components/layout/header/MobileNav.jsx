import React from "react";
import { NAV_LINKS } from "../../util/data";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const MobileNav = ({ showSidebar, setShowSidebar }) => {
  const { user } = useSelector((state) => state.profile);

  const location = useLocation();


  return (
    <div
      className={`fixed left-0 top-0 h-full w-[200px] ${
        showSidebar ? "translate-x-0" : "-translate-x-[100%]"
      } transition-all duration-300 bg-white border-r-[1px] border-richblack-5 border-solid z-[9] overflow-auto`}
    >
      <nav className="flex flex-col justify-between h-full">
        <ul className={`flex flex-col gap-4 text-richblack-700 px-4 py-5`}>
          {NAV_LINKS.map((nav, index) => (
            <li key={index} onClick={setShowSidebar.bind(null, false)}>
              <Link
                to={nav.to}
                className={`${location.pathname === nav.to && 'text-white bg-primary'} block p-1 rounded-md`}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
        {!user && (
          <div className="flex flex-col gap-2 px-4 mb-6">
            <Link
              to={"/login"}
              className="bg-tertiary p-1 rounded-md flex md:hidden text-white  items-center justify-center"
              onClick={setShowSidebar.bind(null, false)}
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="bg-tertiary p-1 rounded-md flex items-center justify-center md:hidden text-white"
              onClick={setShowSidebar.bind(null, false)}
            >
              Signup
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileNav;
