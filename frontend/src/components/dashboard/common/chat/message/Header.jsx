import React from "react";
import Image from "../Image";
import { FaArrowRight } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useReciever } from "../../../../../hooks/useReciever";

const Header = ({ handleOpenList }) => {
  const location = useLocation();

  const { recieverDetails, isActive } = useReciever();

  return (
    <header className="bg-background h-[74px] flex items-center justify-between px-4 border-b border-solid border-border">
      {recieverDetails && (
        <div className="flex gap-2">
          <Image src={recieverDetails?.image} isActive={isActive} />
          <div className="flex flex-col">
            <p className="font-semibold text-[15px]">
              {recieverDetails?.firstName + " " + recieverDetails?.lastName}
            </p>
            <p className="text-[13px] text-richblack-400">
              {isActive ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      )}
      {location?.pathname?.split("/").includes("dashboard") && (
        <div className="block sm:hidden">
          <button onClick={handleOpenList}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
