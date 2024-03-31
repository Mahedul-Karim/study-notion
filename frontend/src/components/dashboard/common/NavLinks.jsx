import React from "react";
import { NavLink, useLocation } from "react-router-dom";


const NavLinks = ({id,icon,title,to}) => {
  const location = useLocation();
  return (
    <>
      {
        id < 4 ? (
          <NavLink
            to={to}
            
            className={`${
              location.pathname === to && "lg:bg-yellow800 text-yellow50"
            } lg:pl-8 py-2 flex items-center gap-2`}
          >
            {icon} <span className="hidden lg:inline-block">{title}</span>
          </NavLink>
        ) : (
          <>
            {id < 5 && (
              <div className="h-[0.5px] bg-richblack-700 w-10/12 mx-auto my-4 hidden lg:block" />
            )}
            {id === 4 && (
              <NavLink
                to={to}
               
                className={`${
                  location.pathname === to && "lg:bg-yellow800 text-yellow50"
                } lg:pl-8 py-2 flex items-center gap-2`}
              >
                {icon} <span className="hidden lg:inline-block">{title}</span>
              </NavLink>
            )}
            {id === 5 && (
              <button
                className={`${
                  location.pathname === to && "bg-yellow800 text-yellow50"
                } lg:pl-8 py-2 flex items-center gap-2`}
                
              >
                {icon} <span className="hidden lg:inline-block">{title}</span>
              </button>
            )}
          </>
        )
      }
    </>
  );
};

export default NavLinks;
