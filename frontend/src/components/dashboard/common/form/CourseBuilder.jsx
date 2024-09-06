import React, { useEffect, useState } from "react";
import Input from "../../../ui/inputs/Input";
import { FiPlusCircle } from "react-icons/fi";
import Sections from "./Sections";
import CancelButton from "../CancelButton";
import FormButton from "../../../ui/inputs/FormButton";
import Label from "./inputs/Label";
import { useDispatch, useSelector } from "react-redux";
import {
  addSection,
  editSection,
  deleteSection,
  addNewCourse,
} from "../../../../store/slices/course";
import { useApi } from "../../../../hooks/useApi";
import { useToast } from "../../../../hooks/useToast";
import SpinnerModal from "../../../ui/modal/SpinnerModal";

const CourseBuilder = ({ setActive, setIsEditing }) => {
  const [sectionName, setSectionName] = useState("");
  const [isSectionEditing, setIsSectionEditing] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState(null);

  const { success, error, warning } = useToast();

  const dispatch = useDispatch();

  const { newCourse } = useSelector((state) => state.course);

  const { mutate, isPending } = useApi({
    success: (data) => {
      success(data.message);
      if (isSectionEditing) {
        dispatch(
          editSection({ index: sectionToEdit, name: data.section.sectionName })
        );
        setIsSectionEditing(false);
        setSectionToEdit(null);
        setSectionName("");
      } else {
        dispatch(addNewCourse(data.updatedCourse));
      }
    },
    error: (err) => {
      error(err);
    },
  });

  useEffect(() => {
    if (isSectionEditing) {
      setSectionName(newCourse.courseContents[sectionToEdit].sectionName);
    }
  }, [isSectionEditing]);

  const onClick = () => {
    if (!sectionName) {
       warning("Section Name is required!");
       return;
    }
    if (isSectionEditing) {
      const sectionId = newCourse.courseContents[sectionToEdit]._id;

      const options = {
        method: "PATCH",
        data: {
          sectionId,
          sectionName,
        },
      };

      mutate({ endpoint: "section", options });


      return;
    }

    const options = {
      method: "POST",
      data: {
        sectionName,
        courseId: newCourse._id,
      },
    };
    mutate({ endpoint: "section", options });
    setSectionName("");
  };

  const removeSection = (index) => {
    dispatch(deleteSection(index));
  };

  const nextForm = () => {
    if (
      newCourse.courseContents.length === 0 ||
      newCourse.courseContents[0].subSection.length === 0
    ) {
      return error("One section and one sub section is required!");
    }
    setActive(3);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-semibold">Course Builder</h3>
      <div>
        <div>
          <Label>Section Name</Label>
          <input
            className="bg-white text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 border border-solid border-border"
            placeholder="Add a section to build your course"
            type="text"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="border border-solid border-secondary mt-4 px-4 py-2 rounded-md text-secondary flex items-center gap-2"
            onClick={onClick}
          >
            {isSectionEditing ? "Save changes" : "Create Section"}
            <span>
              <FiPlusCircle size={18} />
            </span>
          </button>
          {isSectionEditing && (
            <button
              className="text-sm underline text-richblack-500 self-end"
              onClick={() => {
                setIsSectionEditing(false);
                setSectionToEdit(null);
                setSectionName("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <div
        className="bg-white border border-solid border-border rounded-xl px-6 py-5 mt-5"
        style={{
          display: newCourse?.courseContents?.length > 0 ? "block" : "none",
        }}
      >
        {newCourse?.courseContents.length > 0 &&
          newCourse?.courseContents?.map((sec, i) => (
            <Sections
              key={i}
              sectionName={sec.sectionName}
              subSection={sec.subSection}
              isSectionEditing={isSectionEditing}
              setIsSectionEditing={setIsSectionEditing}
              setSectionToEdit={setSectionToEdit}
              index={i}
              removeSection={removeSection}
              sectionId={sec._id}
              courseId={newCourse?._id}
            />
          ))}
      </div>

      <div className="flex items-center gap-2 self-end mt-4">
        <CancelButton
          onClick={() => {
            setActive(1);
            setIsEditing(true);
          }}
        >
          Prev
        </CancelButton>
        <FormButton extraClass="!mt-0 bg-primary" onClick={nextForm}>
          Next
        </FormButton>
      </div>
      {isPending && <SpinnerModal />}
    </div>
  );
};

export default CourseBuilder;
