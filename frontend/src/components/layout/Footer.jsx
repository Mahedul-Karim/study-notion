import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import Logo from "../ui/Logo";
import { NAV_LINKS } from "../util/data";

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
      className={`bg-background py-3 ${
        isMobileDashboard && "mb-[80px]"
      } border-t border-solid border-[#f1f2ff]`}
    >
      <Container extraClass="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Logo />
          <p className="text-sm leading-[1.5] text-black/60 my-2 max-w-[250px]">
            StudyNotion is dedicated to making learning accessible, engaging,
            and effective for everyone.
          </p>
        </div>
        <div>
          <h3 className="text-[#392C7D] font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-black/60">
                About
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-black/60">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[#392C7D] font-semibold mb-4">Links</h3>
          <ul className="space-y-2">
            {NAV_LINKS?.map((nav, i) => (
              <li key={i}>
                <Link to={nav.to} className="text-black/60">
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container extraClass="border-t border-border text-center text-background/80 mt-8 pb-4 flex justify-center items-center">
        <p className="text-sm text-black/60">
          &copy; {new Date().getFullYear()}, StudyNotion
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
