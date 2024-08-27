import React from "react";
import NavLinks from "./NavLinks";

const Sidebar = ({ dashboardLinks }) => {
  return (
    <div className="bg-white border-r border-solid border-border flex lg:flex-col flex-row gap-6 400px:gap-8 lg:gap-0 items-center lg:items-stretch py-1 lg:py-8 text-richblack-700 font-semibold text-[14px] rounded-full lg:rounded-xl justify-self-center lg:justify-self-stretch px-4 mt-8 lg:mt-0 shadow-[0_0_10px_0_#917CF6] lg:shadow-none fixed bottom-5 lg:static z-10 min-h-max lg:min-h-[calc(100vh_-_70px)]">
      {dashboardLinks.map((link) => (
        <NavLinks
          key={link.id}
          title={link.title}
          icon={link.icon}
          id={link.id}
          to={link.to}
        />
      ))}
    </div>
  );
};

export default Sidebar;
