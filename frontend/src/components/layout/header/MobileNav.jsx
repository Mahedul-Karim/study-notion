import { NAV_LINKS } from "../../util/data";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../ui/Logo";
const MobileNav = ({ showSidebar, setShowSidebar }) => {
  const { user } = useSelector((state) => state.profile);

  const location = useLocation();

  return (
    <div
      className={`fixed inset-0 bg-black/10 backdrop-blur-[5px] overlay ${showSidebar ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}
      onClick={(e) => {
        if (e.target.classList.contains("overlay")) {
          setShowSidebar(false);
        }
      }}
    >
      <div
        className={`h-full w-[70%] ${
          showSidebar ? "translate-x-0" : "-translate-x-[100%]"
        } transition-all duration-300 bg-white border-r-[1px] border-richblack-5 border-solid z-[9] overflow-auto sidebar`}
      >
        <div className="py-2 border-b border-border flex items-center justify-center">
          <Logo />
        </div>
        <nav className="flex flex-col justify-between h-full">
          <ul className={`flex flex-col gap-4 text-richblack-700 px-4 py-5`}>
            {NAV_LINKS.map((nav, index) => (
              <li key={index} onClick={setShowSidebar.bind(null, false)}>
                <Link
                  to={nav.to}
                  className={`${
                    location.pathname === nav.to && "text-white bg-primary"
                  } py-2 rounded-md flex items-center justify-center`}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
          {!user && (
            <div className="flex flex-col gap-2 px-4 mb-6 border-t border-border pt-4">
              <Link
                to={"/signup"}
                className="bg-secondary py-2 rounded-md flex items-center justify-center text-sm md:hidden text-white"
                onClick={setShowSidebar.bind(null, false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
