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
import { toast } from "react-hot-toast";

const CourseForm = ({ active, setActive, isFormEdit, setIsFormEdit }) => {
  const [thumbnail, setThumbnail] = useState("");

  const [instructions, setInstructions] = useState([]);

  const dispatch = useDispatch();

  const { newCourse } = useSelector((state) => state.course);

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: isFormEdit ? newCourse : "",
  });

  useEffect(() => {
    if (isFormEdit) {
      setInstructions(newCourse.instructions);
      setThumbnail(newCourse.thumbnail);
    }
  }, [isFormEdit]);

  const showThumbnailPreview = (file) => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setThumbnail(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    if (isFormEdit) {
      const previousInstructions = [...newCourse.instructions];

      if (
        !isDirty &&
        previousInstructions.length === instructions.length &&
        thumbnail === newCourse.thumbnail
      ) {
        toast.error("Edit form first to save changes!");
        return;
      }
      dispatch(editCourse({ ...data, thumbnail, instructions,isDrift:true }));
    } else {
      dispatch(
        addNewCourse({ ...data, thumbnail, instructions, courseContents: [],isDrift:true })
      );
    }
    setActive(2);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        <FormButton type="submit" extraClass="!mt-0">
          {isFormEdit ? "Save Changes" : "Next"}
        </FormButton>
      </div>
    </form>
  );
};

export default CourseForm;
