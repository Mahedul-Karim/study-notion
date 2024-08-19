import React from "react";
import { NAV_LINKS } from "../../util/data";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const NavBar = ({ extraClass = "" }) => {
  return (
    <nav>
      <ul className={`${extraClass} items-center gap-4 text-richblack-700`}>
        {NAV_LINKS.map((nav, index) => (
          <li key={index}>
            <NavLink
              to={nav.to}
              className={({ isActive }) => isActive && "text-primary"}
            >
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
