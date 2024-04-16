import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const [isMobileDashboard, setIsMobileDashboard] = useState(false);

  useEffect(() => {
    const setMobileDashboard = () => {
      setIsMobileDashboard(
        location?.pathname?.split("/").includes("dashboard") &&
          document.body.clientWidth < 1024
      );
    };

    setMobileDashboard();
  }, []);

  return (
    <footer
      className={`bg-richblack-800 border-t border-solid border-richblack-700 py-3 flex items-center justify-center text-richblack-100 h-[70px] ${
        isMobileDashboard && "mb-[80px]"
      }`}
    >
      CodeHelp © 2023 Studynotion
    </footer>
  );
};

export default Footer;
