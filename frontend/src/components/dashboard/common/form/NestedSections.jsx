import React, { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { RxDropdownMenu } from "react-icons/rx";
import { removeSubSection } from "../../../../store/slices/course";
import { useDispatch } from "react-redux";
import ConfirmationModal from "../../../ui/modal/ConfirmationModal";
import { useApi } from "../../../../hooks/useApi";
import { useToast } from "../../../../hooks/useToast";

const NestedSections = ({
  setIsViewing,
  setIsEditing,
  title,
  setSubSectionToEdit,
  index,
  sectionName,
  id
}) => {
  const dispatch = useDispatch();

  const { success, error, warning } = useToast();

  const [openModal,setOpenModal]=useState(false)

  const { mutate,isPending } = useApi({
    success:(data)=>{
      setOpenModal(false);
      success(data.message);
      dispatch(removeSubSection({ index, sectionName }));
    },
    error:(err)=>{
      error(err)
    }
  })

  const deleteSubSection = () => {
    const options ={
      method:'DELETE',
      data:{
        id,sectionName
      }
    }
    mutate({endpoint:'subSection',options}) 
  };

  return (
    <div
      className={`items-center justify-between py-3 border-b-[2px] border-solid border-border flex`}
    >
      <div className="flex items-center gap-2">
        <button>
          <RxDropdownMenu size={22} />
        </button>
        <p
          className="text-[15px] font-semibold cursor-pointer"
          onClick={() => {
            setIsViewing(true);
            setSubSectionToEdit(index);
          }}
        >
          {title}
        </p>
      </div>
      <div className="flex items-center text-richblack-300">
        <button
          onClick={() => {
            setIsEditing(true);
            setSubSectionToEdit(index);
          }}
        >
          <BiSolidPencil size={18} />
        </button>
        <button className="px-2" onClick={setOpenModal.bind(null,true)}>
          <FaTrash size={14} />
        </button>
      </div>
      {openModal && (
        <ConfirmationModal
          heading={"Are you sure?"}
          paragraph={"This action can not be undone"}
          btn1text={"Delete"}
          onClick2={setOpenModal.bind(null, false)}
          onClick1={deleteSubSection}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default NestedSections;
