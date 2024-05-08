import React from "react";
import Ratings from "../../ui/Ratings";

const Reviews = ({ user, rating, review }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <img
          src={user?.image}
          className="size-8 rounded-full object-cover"
        />
        <p className="text-[18px] capitalize font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
      </div>
      <p className="flex items-center">
        <Ratings size={20} rating={rating} />{" "}
      </p>
      <p className="text-richblack-100 text-base">{review}</p>
    </div>
  );
};

export default Reviews;
