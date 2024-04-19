import React from "react";
import Ratings from "../../ui/Ratings";

const Reviews = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <img
          src="https://api.dicebear.com/5.x/initials/svg?seed=hachi%20man"
          className="size-8 rounded-full object-cover"
        />
        <p className="text-[18px] capitalize font-semibold">hachi man</p>
      </div>
      <p className="flex items-center">
        <Ratings size={20} rating={4.5} />{" "}
      </p>
      <p className="text-richblack-100 text-base">
        The Python Basics course was a fantastic introduction to programming
      </p>
    </div>
  );
};

export default Reviews;
