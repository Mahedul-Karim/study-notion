import React from 'react'
import NavLinks from './NavLinks'

const Sidebar = ({dashboardLinks}) => {
  return (
    <div className="bg-richblack-800 border-r border-solid border-richblack-700 flex lg:flex-col flex-row gap-6 400px:gap-8 lg:gap-0 items-center lg:items-stretch py-1 lg:py-8 text-richblack-300 font-semibold text-[14px] h-max lg:h-full rounded-full lg:rounded-none justify-self-center lg:justify-self-stretch px-4  400px:px-8 lg:px-0 mt-8 lg:mt-0 shadow-[0_0_10px_0_#118ab2] lg:shadow-none fixed bottom-5 lg:static z-10">
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
  )
}

export default Sidebar