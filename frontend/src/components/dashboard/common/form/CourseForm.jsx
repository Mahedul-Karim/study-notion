import { useEffect, useState } from "react";
import FormButton from "../../../ui/inputs/FormButton";
import { useForm } from "react-hook-form";
import Title from "./inputs/Title";
import Description from "./inputs/Description";
import Price from "./inputs/Price";
import Category from "./inputs/Category";
import Upload from "./inputs/Upload";
import Benefits from "./inputs/Benefits";
import Instructions from "./inputs/Instructions";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, editCourse } from "../../../../store/slices/course";
import CancelButton from "../CancelButton";
import { useApi } from "../../../../hooks/useApi";
import SpinnerModal from "../../../ui/modal/SpinnerModal";
import { useThumbnail } from "../../../../hooks/useThumbnail";
import { useToast } from "../../../../hooks/useToast";

const CourseForm = ({
  active,
  setActive,
  isFormEdit,
  setIsFormEdit,
  isEditing,
}) => {
  const [thumbnail, setThumbnail] = useState("");

  const [instructions, setInstructions] = useState([]);

  const { success, error, warning } = useToast();

  const dispatch = useDispatch();

  const { newCourse } = useSelector((state) => state.course);

  const { showThumbnailPreview } = useThumbnail(setThumbnail);

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: isFormEdit || isEditing ? newCourse : "",
  });

  useEffect(() => {
    if (isFormEdit) {
      setInstructions(newCourse.instructions);
      setThumbnail(newCourse.thumbnail.url);
    }
  }, [isFormEdit]);

  const { mutate, isPending } = useApi({
    success: (data) => {
      if(isFormEdit){
        success(data.message)
      }
      dispatch(addNewCourse(data.course));
      setActive(2);
    },
    error: (err) => {
      error(err);
    },
  });

  const onSubmit = (data) => {
    if (isFormEdit) {
      const previousInstructions = [...newCourse.instructions];

      if (
        !isDirty &&
        previousInstructions.length === instructions.length &&
        thumbnail === newCourse.thumbnail
      ) {
        warning("Edit form first to save changes!");
        return;
      }
      const options = {
        method: "PATCH",
        data: {
          ...data,
          thumbnail,
          instructions,
          courseId:newCourse?._id
        },
      };
      mutate({ endpoint: `course`, options });
      
    } else {
      const options = {
        method: "POST",
        data: {
          ...data,
          thumbnail,
          instructions,
        },
      };
      mutate({ endpoint: "course", options });
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title
          register={register("courseName", {
            required: "Course title is required!",
          })}
          errors={errors}
        />
        <Description
          register={register("courseDescription", {
            required: "Course Description is required!",
          })}
          errors={errors}
        />
        <Price
          register={register("price", {
            required: "Course Price is required!",
            valueAsNumber: true,
          })}
          errors={errors}
        />
        <Category
          register={register("category", {
            required: "Course Category is required!",
            validate: (value) => {
              return (
                value !== "Choose a category" || "Course Category is required!"
              );
            },
          })}
          errors={errors}
        />
        <Upload
          thumbnail={thumbnail}
          previewFunction={showThumbnailPreview}
          onCancel={setThumbnail.bind(null, "")}
          label={"Course Thumbnail"}
        />
        <Benefits
          register={register("whatYouWillLearn", {
            required: "Course Benefits are required!",
          })}
          errors={errors}
        />
        <Instructions
          instructions={instructions}
          setInstructions={setInstructions}
        />
        <div className="flex items-center gap-2 self-end">
          {isFormEdit && (
            <CancelButton
              onClick={() => {
                setActive(2);
                setIsFormEdit(false);
              }}
            >
              Continue without saving
            </CancelButton>
          )}
          <FormButton type="submit" extraClass="!mt-0 bg-primary" disabled={isPending}>
            {isFormEdit ? "Save Changes" : "Next"}
          </FormButton>
        </div>
      </form>
      {isPending && <SpinnerModal />}
    </>
  );
};

export default CourseForm;
