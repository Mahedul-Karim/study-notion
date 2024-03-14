import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "../ui/HighlightText";
import Button from "../ui/Button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Link
        to={"/signup"}
        className="flex items-center gap-2 px-4 py-1 400px:px-6 400px:py-2 rounded-full bg-richblack-700 text-[14px] 400px:text-[16px] font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all hover:scale-95 hover:drop-shadow-none duration-200"
      >
        Become an Instructor <FaArrowRight />
      </Link>
      <h1 className="text-4xl font-bold text-white mt-4 text-center">
        Empower Your Future with<HighlightText>Coding Skills</HighlightText>{" "}
      </h1>
      <p className="text-richblack-300 font-bold max-w-[80%] text-center mt-4">
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.
      </p>
      <div className="flex items-center gap-4 400px:flex-row flex-col mt-6">

      <Button yellow to={"/about"}>Learn More</Button>
      <Button to={"/login"}>Book a demo</Button>
      </div>
    </div>
  );
};

export default Hero;
