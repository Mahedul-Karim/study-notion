import React from "react";
import Ratings from "../ui/Ratings";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <Link to={`/course/python-development`} className="flex flex-col border border-solid border-richblack-700 rounded-md cursor-pointer overflow-clip">
      <img
        className="w-full aspect-video object-cover"
        src="https://res.cloudinary.com/dbr73rpz9/image/upload/v1688631640/images/1106091-Python_iw6fih.jpg"
      />
      <h2 className="mt-3 text-[16px] md:text-lg font-semibold pl-2 text-richblack-25">
        Python Development
      </h2>
      <p className="text-richblack-25 pl-2 text-xs mt-1">
        By <span className="text-yellow font-bold">Some One</span>
      </p>
      <div className="flex items-center pl-2 gap-2 text-[15px] mt-1">
        <span className="text-yellow">4.5</span>
        <p className="flex items-center">
          <Ratings size={16} rating={2.5} />{" "}
        </p>
        <p>4 ratings</p>
      </div>
      <p className="pl-2 pb-3 text-base sm:text-[18px] mt-1">$100</p>
    </Link>
  );
};

export default Card;
