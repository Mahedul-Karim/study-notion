import React from "react";
import Ratings from "../ui/Ratings";
import { Link } from "react-router-dom";
import { formatCurrency } from "../util/format";

const Card = ({ course }) => {
  const creatorName =
    course?.instructor?.firstName + course?.instructor?.lastName;

  const link = course?.courseName?.replace(" ","-");

  

  return (
    <Link
      to={`/course/${link}`}
      className="flex flex-col border border-solid border-richblack-700 rounded-md cursor-pointer overflow-clip"
    >
      <img
        className="w-full aspect-video object-cover"
        src={course?.thumbnail?.url}
      />
      <h2 className="mt-3 text-[16px] md:text-lg font-semibold pl-2 text-richblack-25">
        {course?.courseName?.length <=50 ? course?.courseName : course?.courseName?.substring(0,50)+"..."}
      </h2>
      <p className="text-richblack-25 pl-2 text-xs mt-1">
        By <span className="text-yellow font-bold">{creatorName}</span>
      </p>
      <div className="flex items-center pl-2 gap-2 text-[15px] mt-1">
        <span className="text-yellow">0</span>
        <p className="flex items-center">
          <Ratings size={16} rating={0} />{" "}
        </p>
        <p>{course?.ratingAndReviews?.length} ratings</p>
      </div>
      <p className="pl-2 pb-3 text-base sm:text-[18px] mt-1">
        {formatCurrency(course?.price)}
      </p>
    </Link>
  );
};

export default Card;
