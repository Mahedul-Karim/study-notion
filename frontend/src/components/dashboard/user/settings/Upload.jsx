import React from "react";
import Img from "../../common/Img";
import FormButton from "../../../ui/inputs/FormButton";
import { FiUpload } from "react-icons/fi";
const Upload = () => {
  return (
    <>
      <Img
        src={"https://api.dicebear.com/5.x/initials/svg?seed=Test User"}
        alt={""}
      />
      <div className="flex flex-col gap-1">
        <p>Change Profile Picture</p>
        <div className="flex gap-2 items-center mt-1">
          <label
            htmlFor="imageUpload"
            className="py-[7px] 400px:py-[8px] px-[8px] 400px:px-[12px] inline-block bg-richblack-700 rounded-lg cursor-pointer font-medium text-[14px] 400px:text-base"
          >
            Select
          </label>
          <input type="file" className="hidden" id="imageUpload" />
          <FormButton extraClass="!mt-0 flex items-center gap-2">
            Upload
            <span>
              <FiUpload />
            </span>
          </FormButton>
        </div>
      </div>
    </>
  );
};

export default Upload;
