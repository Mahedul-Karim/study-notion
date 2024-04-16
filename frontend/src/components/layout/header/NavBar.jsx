import React from "react";
import { NAV_CATEGORY, NAV_LINKS } from "../../util/data";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";




const NavBar = ({ extraClass = "" }) => {
 
  return (
    <nav>
      <ul className={`${extraClass} items-center gap-4 text-richblack-25`}>
        {NAV_LINKS.map((nav, index) =>
          nav.isDropdown ? (
            <div key={index} className="relative group z-[2]">
              <button className="flex items-center gap-1">
                {nav.title}{" "}
                <FaChevronDown className="group-hover:rotate-180 transition-all duration-300" />
              </button>
            
                <div className="invisible opacity-0 translate-y-[10%] group-hover:visible group-hover:opacity-100 group-hover:-translate-y-0 absolute bg-richblack-5 top-[40px] rounded-md left-0 px-4 py-4 text-richblack-900 flex flex-col gap-2 w-max transition-all duration-200 ">
                  <div className="absolute -top-[8px] left-[16px] size-[24px] rotate-45 z-[-1] rounded bg-richblack-5" />
                  {NAV_CATEGORY.map((link, i) => (
                    <Link
                      key={i}
                      to={`/category/${link?.title.split(" ").join("-")}`}
                      className="inline-block px-6 py-4 hover:bg-richblack-50 rounded-md transition-all duration-200 first-letter:capitalize"
                    >
                      {link?.title}
                    </Link>
                  ))}
                </div>
             
            </div>
          ) : (
            <li key={index}>
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
    </nav>
  );
};

export default NavBar;
