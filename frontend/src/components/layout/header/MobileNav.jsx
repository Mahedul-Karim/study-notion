import React from "react";
import { NAV_CATEGORY, NAV_LINKS } from "../../util/data";
import { FaChevronDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const MobileNav = ({ showSidebar, setShowSidebar }) => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div
      className={`fixed left-0 top-0 h-full w-[200px] ${
        showSidebar ? "translate-x-0" : "-translate-x-[100%]"
      } transition-all duration-300 bg-richblack-800 border-r-[2px] border-solid border-richblack-700 z-[99999999] overflow-auto`}
    >
      <nav>
        <ul className={`flex flex-col gap-4 text-richblack-25 px-4 py-5`}>
          {NAV_LINKS.map((nav, index) =>
            nav.isDropdown ? (
              <div key={index} className="relative z-[2] flex flex-col">
                <button className="flex items-center gap-1">
                  {nav.title} <FaChevronDown />
                </button>

                <div
                  className={`flex flex-col gap-4 mt-4 pl-3 overflow-hidden transition-all duration-300`}
                >
                  {NAV_CATEGORY.map((link, i) => (
                    <Link
                      key={i}
                      to={`/category/${link?.title.split(" ").join("-")}`}
                      className="inline-block  rounded-md transition-all duration-200 first-letter:capitalize"
                      onClick={setShowSidebar.bind(null, false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <li key={index} onClick={setShowSidebar.bind(null, false)}>
                <NavLink
                  to={nav.to}
                  className={({ isActive }) => isActive && "text-yellow"}
                >
                  {nav.title}
                </NavLink>
              </li>
            )
          )}
        </ul>
        {!user && (
          <div className="flex flex-col gap-2 px-4 mb-6">
            <Link
              to={"/login"}
              className="bg-yellow p-1 rounded-md border-2 border-solid border-yellow50 flex md:hidden text-black  items-center justify-center"
              onClick={setShowSidebar.bind(null, false)}
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="bg-yellow p-1 rounded-md border-2 border-solid border-yellow50 flex items-center justify-center md:hidden text-black"
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
