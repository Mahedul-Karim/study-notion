import React, { useState } from "react";
import FormButton from "../../ui/inputs/FormButton";
import { FaRegShareSquare } from "react-icons/fa";
import { toast } from "react-hot-toast";
import PaymentModal from "../../ui/modal/PaymentModal";

const Action = () => {
  const [showModal, setShowModal] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("URL copied to clipboard");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <aside className="bg-richblack-700 rounded-md p-4 flex flex-col gap-2 h-max">
      <img
        className="aspect-video object-cover rounded-md"
        src="https://res.cloudinary.com/dbr73rpz9/image/upload/v1688631640/images/1106091-Python_iw6fih.jpg"
      />
      <h4 className="font-bold text-2xl">$999</h4>
      <FormButton extraClass="!mt-0" onClick={setShowModal.bind(null,true)}>Buy Now</FormButton>
      <button className="rounded-lg bg-richblack-800 py-[6px] 400px:py-[8px] px-[8px] 400px:px-[12px] font-medium text-richblack-25 text-[14px] 400px:text-base">
        Add to Cart
      </button>
      <p className="text-sm text-center text-richblack-100">
        30-Day Money-Back Guarantee
      </p>
      <div className="mt-4">
        <p className="text-xl font-bold">This course includes:</p>
        <ul className="text-[rgb(6_214_160)] gap-1 text-sm mt-3 flex flex-col">
          <li className="flex items-center gap-2">
            <span className="text-lg">✓</span>Regular practice
          </li>
          <li className="flex items-center gap-2">
            <span className="text-lg">✓</span>Regular practice
          </li>
          <li className="flex items-center gap-2">
            <span className="text-lg">✓</span>Regular practice
          </li>
          <li className="flex items-center gap-2">
            <span className="text-lg">✓</span>Regular practice
          </li>
        </ul>
      </div>
      <button
        className="flex gap-2 items-center justify-center text-yellow"
        onClick={copyToClipboard}
      >
        <FaRegShareSquare />
        Share
      </button>
      {showModal && <PaymentModal setShowModal={setShowModal}/>}
    </aside>
  );
};

export default Action;
