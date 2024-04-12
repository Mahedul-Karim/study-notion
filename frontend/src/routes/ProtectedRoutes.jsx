import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, type }) => {
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  } else {
    if (user.accountType !== type) {
      navigate("/");
    } else {
      return children;
    }
  }
};

export default ProtectedRoutes;
