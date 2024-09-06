import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/Footer";
import Fallback from "../routes/Fallback";

const Main = () => {
  return (
    <>
      <Header />
      <Fallback>
        <Outlet />
      </Fallback>
      <Footer />
    </>
  );
};

export default Main;
