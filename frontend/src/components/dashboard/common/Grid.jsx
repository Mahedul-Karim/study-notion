import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProgressBar from "../../ui/ProgressBar";
import { useNavigate } from "react-router-dom";
import DotMenu from '../../ui/DotMenu'


const Grid = ({thumbnail,name,description,progress,courseId,course}) => {
  const navigate = useNavigate();

  const courseProgress = progress.find(prog => prog.courseId === courseId )

  const completedPercentage = (courseProgress.completedSections.length / course?.courseContents.length  ) * 100;
  

  return (
    <div className="min-w-[930px] grid grid-cols-[1.3fr_0.8fr_0.7fr_0.3fr] px-4 py-3 text-[15px]">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(`/view-course?course=${name.replace(" ",'-')}`)}
      >
        <img
          src={thumbnail}
          className="size-12 rounded-md"
        />
        <div>
          <h3 className="font-semibold">{name?.length < 30 ? name : name?.substring(0,30)+"..."}</h3>
          <p className="text-richblack-300 text-[14px]">{description?.length < 30 ? description : description?.substring(0,30)+"..."}</p>
        </div>
      </div>
      <div className="self-center text-[14px] font-semibold">
        2hr 30 minutes
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[14px]">Progress {Math.round(completedPercentage)}%</p>
        <ProgressBar width={Math.round(completedPercentage)} />
      </div>
      <div className="justify-self-center self-center relative">
        <button>
          <BsThreeDotsVertical fontSize={24} />{" "}
        </button>
      </div>
    </div>
  );
};

export default Grid;
