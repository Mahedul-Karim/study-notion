import React from "react";
import Heading from "../../common/Heading";
import CartItem from "./CartItem";
import FormButton from "../../../ui/inputs/FormButton";

const Cart = () => {
  return (
    <>
      <Heading>Cart</Heading>
      <div className="text-richblack-300 font-bold text-[17px]">
        0 courses in cart
        <span className="h-[0.5px] mt-2 bg-richblack-300 w-full block" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.4fr] gap-x-4">
        <div className="flex flex-col cart">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <div className="bg-richblack-700 border border-solid border-richblack-500 rounded-md flex flex-col gap-2 py-6 px-4 md:mt-0 mt-6 h-max">
          <p className="text-richblack-200 text-sm font-medium">Total:</p>
          <h4 className="text-[30px] text-yellow">$1</h4>
          <FormButton extraClass="!mt-0">Buy Now</FormButton>
        </div>
      </div>
    </>
  );
};

export default Cart;
