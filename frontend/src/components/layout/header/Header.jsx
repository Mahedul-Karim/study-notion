import React, { useState } from "react";
import Container from "../Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import DotMenu from "../../ui/DotMenu";
import { useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";
const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);

  return (
    <header
      className={`border-b border-solid border-richblack-700 bg-richblack-800`}
    >
      <Container extraClass={"!py-3 flex items-center justify-between"}>
        <img
          src="/assets/logo.png"
          height={42}
          width={160}
          loading="lazy"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
        <NavBar />
        <div className="flex items-center gap-4 text-richblack-100 relative">
          {user ? (
            <>
              {" "}
              <Link
                to={"/login"}
                className="bg-richblack-800 px-3 py-2 rounded-md border-2 border-solid border-richblack-700"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="bg-richblack-800 px-3 py-2 rounded-md border-2 border-solid border-richblack-700"
              >
                Signup
              </Link>{" "}
            </>
          ) : (
            <>
              <img
                src="https://api.dicebear.com/5.x/initials/svg?seed=Test User"
                alt=""
                className="size-9 rounded-full cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
              />
              <DotMenu open={open}>
                <Link
                  to={"/dashboard/instructor"}
                  className="flex items-center gap-1"
                  onClick={setOpen.bind(null,false)}
                >
                  <RxDashboard className="text-lg" /> <span>Dashboard</span>
                </Link>
                <Link to={"/dashboard/user"}>Logout</Link>
              </DotMenu>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
