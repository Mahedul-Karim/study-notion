import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { RxCross1 } from "react-icons/rx";
import Upload from "../../dashboard/common/form/inputs/Upload";
import Input from "../inputs/Input";
import Label from "../../dashboard/common/form/inputs/Label";
import TextArea from "../inputs/TextArea";
import FormButton from "../inputs/FormButton";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addSubSection, editSubSection } from "../../../store/slices/course";

const SubSectionModal = ({
  setShowModal,
  isAdding,
  isViewing,
  isEditing,
  sectionName,
  setShowSubSection,
  subSectionToEdit,
  subSectionData,
}) => {
  const [video, setVideo] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: isViewing || isEditing ? subSectionData : "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isViewing || isEditing) {
      setVideo(subSectionData.videoUrl);
    }
  }, [isViewing, isEditing]);

  const showVideoPreview = (file) => {
    if (!file || !isAdding) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setVideo(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    if (isViewing) {
      return;
    }
    if (isEditing) {
      dispatch(
        editSubSection({
          ...data,
          videoUrl: video,
          index: subSectionToEdit,
          sectionName,
        })
      );
    } else {
      dispatch(addSubSection({ ...data, sectionName, videoUrl: video }));
    }
    reset();
    setShowModal(false);
    setShowSubSection(true);
  };

  return (
    <Modal>
      <div className="w-full 400px:w-11/12 max-w-[650px] rounded-md text-white border border-solid border-richblack-500 relative  hideScrollbar h-[350px] 400px:h-[600px] overflow-auto hideScrollbar">
        <div className="bg-richblack-700 px-6 py-3 text-[22px] font-semibold flex items-center justify-between">
          <h2>Adding Lecture</h2>
          <button type="button" onClick={() => setShowModal(false)}>
            <RxCross1 />{" "}
          </button>
        </div>
        <form
          className="p-6 bg-richblack-800 flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Upload
            label={"Lecture Video"}
            isVideo
            thumbnail={video}
            previewFunction={showVideoPreview}
            onCancel={setVideo.bind(null, "")}
          />
          <div>
            <Input
              label={"Lecture Title"}
              placeholder={"Enter Lecture Title"}
              required
              register={register("title", {
                required: true,
              })}
            />
          </div>
          <div>
            <Label>Lecture Description</Label>
            <TextArea
              placeholder={"Enter Lecture Description"}
              register={register("description", {
                required: true,
              })}
            />
          </div>
          {!isViewing && (
            <div className="self-end">
              <FormButton extraClass="!mt-0" type="submit">
                {isEditing ? "Save Changes" : "Save"}
              </FormButton>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default SubSectionModal;
