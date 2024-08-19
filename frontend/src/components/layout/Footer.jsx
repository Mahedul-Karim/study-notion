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
      className={`bg-white py-3 flex items-center justify-center text-richblack-700 h-[70px] ${
        isMobileDashboard && "mb-[80px]"
      } border-t border-solid border-[#f1f2ff]`}
    >
       © Studynotion
    </footer>
  );
};

export default Footer;
