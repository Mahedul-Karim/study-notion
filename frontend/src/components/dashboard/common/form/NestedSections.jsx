import React from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { RxDropdownMenu } from "react-icons/rx";
import { removeSubSection } from "../../../../store/slices/course";
import { useDispatch } from "react-redux";

const NestedSections = ({
  setIsViewing,
  setIsEditing,
  title,
  setSubSectionToEdit,
  index,
  sectionName,
}) => {
  const dispatch = useDispatch();

  const deleteSubSection = () => {
    dispatch(removeSubSection({ index, sectionName }));
  };

  return (
    <div
      className={`items-center justify-between py-3 border-b-[2px] border-solid border-richblack-500 flex`}
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
        <button className="px-2" onClick={deleteSubSection}>
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
};

export default NestedSections;
