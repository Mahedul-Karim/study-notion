import React from "react";
import Ratings from "../../ui/Ratings";

const Reviews = ({ user, rating, review }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <img src={user?.image} className="size-8 rounded-full object-cover" />
        <div>
          <p className="400px:text-base text-sm capitalize font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
          <p className="flex items-center text-sm 400px:text-base">
            <Ratings rating={rating} />{" "}
          </p>
        </div>
      </div>

      <p className="text-richblack-700 text-sm">{review}</p>
    </div>
  );
};

export default Reviews;
