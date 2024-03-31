import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/Footer";

const Main = () => {
  return (
    <>
    <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
