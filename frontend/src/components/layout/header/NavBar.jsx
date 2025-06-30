import { NAV_LINKS } from "../../util/data";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ extraClass = "" }) => {
  const location = useLocation();

  return (
    <nav>
      <ul className={`${extraClass} items-center gap-4 text-richblack-700`}>
        {NAV_LINKS.map((nav, index) => (
          <li key={index}>
            <Link
              to={nav.to}
              className={`${location.pathname === nav.to && "text-primary"} font-medium text-sm`}
            >
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
