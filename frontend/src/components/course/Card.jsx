import React from "react";
import Ratings from "../ui/Ratings";
import { Link, useSearchParams } from "react-router-dom";
import { formatCurrency } from "../util/format";
import { highlightText } from "../util/helpers";

const Card = ({ course }) => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const creatorName =
    course?.instructor?.firstName + course?.instructor?.lastName;

  const instructorImage = course?.instructor?.image;

  const accountType = course?.instructor?.accountType;

  const link = course?.courseName?.replace(" ", "-");

  const totalReviews = course?.ratingAndReviews?.length;

  const ratings = course?.ratingAndReviews?.reduce(
    (acc, course) => acc + course?.rating,
    0
  );

  const totalRatings = ratings / totalReviews;

  return (
    <Link
      to={`/course/${link}`}
      className="flex flex-col bg-white rounded-2xl cursor-pointer overflow-clip border border-solid border-[#e9ecef] relative pb-4 "
    >
      <img
        className="w-full aspect-[16/12] object-cover"
        src={course?.thumbnail?.url}
      />
      <div className="flex items-center mt-2 px-3 lg:px-5">
        <div className="flex items-center gap-2">
          <img
            src={instructorImage}
            alt=""
            className="size-8 400px:size-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="text-richblack-600 font-semibold text-xs 400px:text-sm">
              {creatorName}
            </p>
            <p className="text-richblack-400 text-[10px] 400px:text-xs">
              {accountType}
            </p>
          </div>
        </div>
      </div>
      <h2 className="mt-3 text-xs 400px:text-sm sm:text-[16px] line-clamp-2 font-semibold text-secondary px-3 lg:px-5">
        {highlightText(course?.courseName, search)}
      </h2>

      <div className="items-center gap-2 text-xs 400px:text-[15px] mt-3 px-3 lg:px-5 400px:flex hidden">
        <p className="flex items-center">
          <Ratings
            rating={totalRatings}
            extraClass={"400px:text-[16px] text-xs"}
          />{" "}
        </p>
        <p className="flex items-center ">
          <span className="text-secondary inline-block">
            {totalRatings || 0}
          </span>
          ({course?.ratingAndReviews?.length})
        </p>
      </div>
      <p className="text-sm 400px:text-base sm:text-[18px] mt-1 bg-white absolute top-4 400px:top-6 400px:right-8 right-4 400px:px-4 px-2 py-1 rounded-md text-primary">
        {formatCurrency(course?.price)}
      </p>
    </Link>
  );
};

export default Card;
