import React from "react";
import Modal from "./Modal";
import FormButton from "../inputs/FormButton";
import Cancel from "../../dashboard/common/CancelButton";
import Spinner from '../../ui/Spinner'


const ConfirmationModal = ({
  heading,
  paragraph,
  btn1text,
  onClick1,
  onClick2,
  isPending
}) => {
  return (
    <Modal>
      <div className="bg-white rounded-md max-w-[350px] w-11/12 p-4 border border-solid border-[#e9ecef] flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-richblack-700">{heading}</h3>
        <p className="text-richblack-700">{paragraph}</p>
        <div className="flex items-center gap-2 mt-2">
          <FormButton extraClass="!mt-0 bg-tertiary" onClick={onClick1} disabled={isPending}>
            {isPending ? <Spinner button/> :  btn1text}
          </FormButton>
          <Cancel extraClass={"!text-richblack-25"} onClick={onClick2} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
