import React from "react";
import Ratings from "../../../ui/Ratings";
import { FaTrash } from "react-icons/fa6";
import { formatCurrency } from "../../../util/format";
import { Link } from "react-router-dom";
const CartItem = ({ course, handleRemoveCart }) => {
  let totalReview;

  if (course?.ratingAndReviews.length === 0) {
    totalReview = 0;
  } else {
    totalReview = course?.ratingAndReviews?.reduce(
      (acc, item) => acc + item.rating,
      0
    );
  }

  const link = course?.courseName?.replace(" ", "-");

  return (
    <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-2 py-6">
      <div className="flex 400px:flex-row flex-col gap-2">
        <img
          src={course?.thumbnail?.url}
          alt=""
          className="w-[140px] h-[100px] object-cover rounded-md"
        />
        <div className="flex flex-col gap-1 justify-center">
          <Link
            to={`/course/${link}`}
            className="text-richblack-700 text-base font-semibold"
          >
            {course?.courseName}
          </Link>
          <p className="text-[14px] text-richblack-300 capitalize">
            {course?.category}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-base text-primary font-semibold">
              {totalReview}
            </p>
            <p className="flex items-center">
              <Ratings rating={totalReview} size={18} />
            </p>
            <p className="text-richblack-700 text-sm">
              {course?.ratingAndReviews?.length} ratings
            </p>
          </div>
          <p className="text-[30px] text-secondary block sm:hidden">
            {formatCurrency(course?.price)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center justify-center">
        <p className="text-xl text-secondary sm:self-end hidden sm:block">
          {formatCurrency(course?.price)}
        </p>
        <button
          className="p-2 text-pink-200 bg-background border border-solid border-border rounded-md text-[14px]"
          onClick={handleRemoveCart.bind(null, course?._id)}
        >
          <FaTrash />{" "}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
