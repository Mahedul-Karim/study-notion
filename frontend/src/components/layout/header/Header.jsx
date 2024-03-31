import React from "react";
import Container from "../Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <div className="flex items-center gap-4 text-richblack-100">
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
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
