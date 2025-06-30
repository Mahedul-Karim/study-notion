import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import Logo from '../ui/Logo'

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
      className={`bg-secondary py-3 ${
        isMobileDashboard && "mb-[80px]"
      } border-t border-solid border-[#f1f2ff]`}
    >
       <Container extraClass="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Logo onFooter />
          <p className="text-sm leading-[1.5] text-background/80 my-2 max-w-[250px]">
            StudyNotion is dedicated to making learning accessible, engaging, and effective for everyone. 
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-background/80">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="text-background/80">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="text-background/80">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/" className="text-background/80">
                Career
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Get Help</h3>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-background/80">
                Forum
              </Link>
            </li>
            <li>
              <Link to="/" className="text-background/80">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="text-background/80">
                Community
              </Link>
            </li>
          </ul>
        </div>
        
      </Container>
      <Container extraClass="border-t border-border text-center text-background/80 mt-8 pb-4 flex justify-center items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}, StudyNotion
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
