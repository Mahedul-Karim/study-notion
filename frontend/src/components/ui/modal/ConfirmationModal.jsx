import React from "react";
import Modal from "./Modal";
import FormButton from "../inputs/FormButton";
import Cancel from "../../dashboard/common/CancelButton";

const ConfirmationModal = ({
  heading,
  paragraph,
  btn1text,
  onClick1,
  onClick2,
}) => {
  return (
    <Modal>
      <div className="bg-richblack-800 rounded-md max-w-[350px] w-11/12 p-4 border border-solid border-richblack-400 flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-richblack-25">{heading}</h3>
        <p className="text-richblack-300">{paragraph}</p>
        <div className="flex items-center gap-2 mt-2">
          <FormButton extraClass="!mt-0" onClick={onClick1}>
            {btn1text}
          </FormButton>
          <Cancel extraClass={"!text-richblack-25"} onClick={onClick2} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
