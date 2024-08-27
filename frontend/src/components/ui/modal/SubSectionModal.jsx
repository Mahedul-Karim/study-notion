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
import { useThumbnail } from "../../../hooks/useThumbnail";
import { useApi } from "../../../hooks/useApi";
import toast from "react-hot-toast";
import Spinner from "../Spinner";

const SubSectionModal = ({
  setShowModal,
  isAdding,
  isViewing,
  isEditing,
  sectionName,
  setShowSubSection,
  subSectionToEdit,
  subSectionData,
  sectionId,
}) => {
  const [video, setVideo] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: isViewing || isEditing ? subSectionData : "",
  });

  const dispatch = useDispatch();

  const { showThumbnailPreview } = useThumbnail(setVideo);

  const { mutate, isPending } = useApi({
    success: (data) => {
      setShowModal(false);
      setShowSubSection(true);
      toast.success(data.message);
      if (data.subSection) {
        dispatch(
          editSubSection({
            ...data.subSection,
            index: subSectionToEdit,
            sectionName,
          })
        );
      } else {
        dispatch(addSubSection({ ...data.subSectionDetails, sectionName }));
      }
      setVideo("");
      reset();
    },
    error: (err) => {
      setShowModal(false);
      toast.error(err);
      setVideo("");
    }
  });

  useEffect(() => {
    if (isViewing || isEditing) {
      setVideo(subSectionData.videoUrl.url);
    }
  }, [isViewing, isEditing]);

  const onSubmit = (data) => {
    
    if (isViewing) {
      return;
    }
    if (isEditing) {
      const options = {
        method: "PATCH",
        data: {
          ...data,
          video,
          id: subSectionData?._id,
        },
      };
      mutate({endpoint:'subSection',options})
    } else {
      const options = {
        method: "POST",
        data: {
          ...data,
          video,
          sectionId,
        },
      };
      mutate({ endpoint: "subSection", options });
    }
    
  };

  return (
    <Modal>
      <div className="w-full 400px:w-11/12 max-w-[650px] rounded-md text-white border border-solid border-border bg-white relative  hideScrollbar h-[80vh] overflow-auto hideScrollbar">
        <div className="bg-background px-6 py-3 text-[22px] font-semibold flex items-center justify-between text-richblack-600">
          <h2>Adding Lecture</h2>
          <button type="button" onClick={() => setShowModal(false)}>
            <RxCross1 />{" "}
          </button>
        </div>
        <form
          className="p-6 bg-white flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Upload
            label={"Lecture Video"}
            isVideo
            thumbnail={video}
            previewFunction={showThumbnailPreview}
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
              disabled={isViewing}
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
              <FormButton extraClass="!mt-0 bg-primary" type="submit" disabled={isPending}>
                {isPending ? (
                  "Saving..."
                ) : isEditing ? (
                  "Save Changes"
                ) : (
                  "Save"
                )}
              </FormButton>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default SubSectionModal;
