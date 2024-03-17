import React from "react";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

const LearnMoreSection = () => {
  return (
    <>
      <Heading
        title1={"Get the skills you need for a"}
        highlightText={"job that is in demand."}
        title2={""}
        textColor={"text-richblack-700"}
      />
      <div className="flex flex-col items-start gap-4">
        <p className="text-richblack-600 w-[86%]">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
        <Button yellow to={"/about"} >Learn more</Button>
      </div>
    </>
  );
};

export default LearnMoreSection;
