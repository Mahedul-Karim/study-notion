import React from "react";
import { useSelector } from "react-redux";

const About = () => {

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-bold">About</h4>
      <p className="text-[14px] text-richblack-300">
       {user?.additionalDetails?.about || "Write Something About Yourself"} 
      </p>
    </div>
  );
};

export default About;
