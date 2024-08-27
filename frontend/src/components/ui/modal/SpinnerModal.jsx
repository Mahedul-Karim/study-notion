import React from "react";
import Spinner from "../Spinner";

const SpinnerModal = () => {
  return (
    <div className="fixed w-full h-full inset-0 bg-black/[0.25] flex items-center justify-center z-[20]">
      <Spinner />
    </div>
  );
};

export default SpinnerModal;
