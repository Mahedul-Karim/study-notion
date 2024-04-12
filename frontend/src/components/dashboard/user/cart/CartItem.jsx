import React from "react";
import Ratings from "../../../ui/Ratings";
import { FaTrash } from "react-icons/fa6";
const CartItem = () => {
  return (
    <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-2 py-4">
      <div className="flex 400px:flex-row flex-col gap-2">
        <img
          src="https://api.dicebear.com/5.x/initials/svg?seed=Test User"
          alt=""
          className="w-[220px] h-[150px] object-cover rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-richblack-25 text-lg font-semibold">
            How to hack
          </h3>
          <p className="text-[14px] text-richblack-300">Cyber seurity</p>
          <div className="flex items-center gap-2">
            <p className="text-lg text-yellow font-semibold">4.5</p>
            <p className="flex items-center">
              <Ratings rating={0} size={18} />
            </p>
            <p className="text-richblack-300">0 ratings</p>
          </div>
          <p className="text-[30px] text-yellow block sm:hidden">$1</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[30px] text-yellow sm:self-end hidden sm:block">$1</p>
        <button className="flex items-center gap-1 p-2 text-pink-200 bg-richblack-700 border border-solid border-richblack-600 rounded-md text-[14px] self-start">
          <FaTrash /> <span>Remove</span>{" "}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
