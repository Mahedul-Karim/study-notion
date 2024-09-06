import React, { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaCaretDown, FaTrash } from "react-icons/fa";
import { RxDropdownMenu } from "react-icons/rx";
import NestedSections from "./NestedSections";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "../../../ui/modal/SubSectionModal";
import ConfirmationModal from "../../../ui/modal/ConfirmationModal";
import { useApi } from "../../../../hooks/useApi";
import { useToast } from "../../../../hooks/useToast";


const Sections = ({
  sectionId,
  sectionName,
  subSection,
  isSectionEditing,
  setIsSectionEditing,
  setSectionToEdit,
  index,
  removeSection,
  courseId,
}) => {
  const [showSubSection, setShowSubSection] = useState(false);

  const { success, error, warning } = useToast();

  const [isAdding, setIsAdding] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [subSectionToEdit, setSubSectionToEdit] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const { mutate, isPending } = useApi({
    success: (data) => {
      setOpenModal(false);
      success(data.message);
      removeSection(index);
    },
    error: (err) => {
      error(err);
      setOpenModal(false);
    },

  });

  const removeSectionHandler = () => {
    const options = {
      method: "DELETE",
      data: {
        courseId,
        sectionId,
      },
    };

    mutate({ endpoint: "section", options });
  };

  return (
    <div>
      <div className="flex items-center justify-between py-3 border-b-[2px] border-solid border-border">
        <div className="flex items-center gap-2">
          <button>
            <RxDropdownMenu size={22} />
          </button>
          <p className="text-[15px] font-semibold cursor-pointer">
            {sectionName}
          </p>
        </div>
        <div className="flex items-center text-richblack-300">
          <button
            onClick={() => {
              setIsSectionEditing(true);
              setSectionToEdit(index);
            }}
          >
            <BiSolidPencil size={18} />
          </button>
          <button
            className="px-2 border-r-[2px] border-solid border-richblack-500"
            onClick={setOpenModal.bind(null, true)}
          >
            <FaTrash size={14} />
          </button>
          <button
            className="px-2"
            onClick={() => setShowSubSection((prev) => !prev)}
          >
            <FaCaretDown size={22} />
          </button>
        </div>
      </div>
      <div className="w-[90%] mx-auto">
        <div
          className={`${
            !showSubSection || subSection?.length === 0 ? "hidden" : "block"
          } `}
        >
          {subSection?.length > 0 &&
            subSection.map((sec, i) => (
              <NestedSections
                setIsEditing={setIsEditing}
                setIsViewing={setIsViewing}
                key={i}
                title={sec.title}
                setSubSectionToEdit={setSubSectionToEdit}
                index={i}
                sectionName={sectionName}
                id={sec._id}
              />
            ))}
        </div>
        <button
          className="flex items-center gap-2 text-secondary text-base py-3"
          onClick={() => setIsAdding(true)}
        >
          <FaPlus size={16} /> Add Lecture{" "}
        </button>
      </div>
      {isAdding && (
        <SubSectionModal
          isAdding
          setShowModal={setIsAdding}
          sectionName={sectionName}
          setShowSubSection={setShowSubSection}
          sectionId={sectionId}
        />
      )}
      {isEditing && (
        <SubSectionModal
          isEditing
          setShowModal={setIsEditing}
          sectionName={sectionName}
          setShowSubSection={setShowSubSection}
          subSectionData={subSection[subSectionToEdit]}
          subSectionToEdit={subSectionToEdit}
          sectionId={sectionId}
        />
      )}
      {isViewing && (
        <SubSectionModal
          isViewing
          setShowModal={setIsViewing}
          sectionName={sectionName}
          setShowSubSection={setShowSubSection}
          subSectionData={subSection[subSectionToEdit]}
          subSectionToEdit={subSectionToEdit}
        />
      )}
      {openModal && (
        <ConfirmationModal
          heading={"Are you sure?"}
          paragraph={"This action can not be undone"}
          btn1text={"Delete"}
          onClick2={setOpenModal.bind(null, false)}
          onClick1={removeSectionHandler}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default Sections;
