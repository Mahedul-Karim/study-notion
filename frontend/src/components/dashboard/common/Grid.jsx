import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProgressBar from "../../ui/ProgressBar";
const Grid = () => {
  return (
    <div className="min-w-[930px] grid grid-cols-[1.3fr_0.8fr_0.7fr_0.3fr] px-4 py-3 text-[15px]">
      <div className="flex items-center gap-3">
        <img
          src="https://api.dicebear.com/5.x/initials/svg?seed=Test User"
          className="size-12 rounded-md"
        />
        <div>
          <h3 className="font-semibold">The complete Python</h3>
          <p className="text-richblack-300 text-[14px]">Short description</p>
        </div>
      </div>
      <div className="self-center text-[14px] font-semibold">
        2hr 30 minutes
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[14px]">Progress 60%</p>
        <ProgressBar width={60}/>
      </div>
      <div className="justify-self-center self-center">
        <button>
          <BsThreeDotsVertical fontSize={24} />{" "}
        </button>
      </div>
    </div>
  );
};

export default Grid;
