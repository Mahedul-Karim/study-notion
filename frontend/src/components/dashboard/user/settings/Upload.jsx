import React, { useState } from "react";
import Img from "../../common/Img";
import FormButton from "../../../ui/inputs/FormButton";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../../ui/ProgressBar";
import { useApi } from "../../../../hooks/useApi";
import { toast } from "react-hot-toast";
import { setUser } from "../../../../store/slices/profile";

const Upload = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const { mutate, isPending } = useApi({
    success: (data) => {
      toast.success("User photo uploaded successfully!");
      dispatch(setUser(data.user));
      setProgress(0)
    },
    error: (err) => {
      toast.error(err);
      setProgress(0);
    },
    getProgress: (prog) => {
      setProgress(prog);
    },
  });

  const setImage = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setUploadImage(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const uploadImg = () => {
    const options = {
      method: "PUT",
      data: { image: uploadImage },
    };

    mutate({ endpoint: "profile",options });
  };

  return (
    <>
      <Img src={uploadImage ? uploadImage : user?.image} alt={""} />
      <div className="flex flex-col gap-1">
        <p>Change Profile Picture</p>
        <div className="flex gap-2 items-center mt-1">
          <label
            htmlFor="imageUpload"
            className="py-[7px] 400px:py-[8px] px-[8px] 400px:px-[12px] inline-block bg-richblack-700 rounded-lg cursor-pointer font-medium text-[14px] 400px:text-base"
          >
            Select
          </label>
          <input
            type="file"
            className="hidden"
            id="imageUpload"
            onChange={setImage}
          />
          <FormButton extraClass="!mt-0 flex items-center gap-2" onClick={uploadImg}>
            Upload
            <span>
              <FiUpload />
            </span>
          </FormButton>
        </div>
      </div>

      {isPending && <ProgressBar width={progress} />}
    </>
  );
};

export default Upload;
