import React from "react";
import { IoMdCloudUpload } from "react-icons/io";
import Label from "./Label";
import VideoPlayer from "../../../../ui/VideoPlayer";

const Upload = ({
  label,
  thumbnail,
  previewFunction,
  onCancel,
  isVideo = false,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="file"
        className="hidden"
        id="thumbnail"
        onInput={(e) => {
          previewFunction(e.target.files[0]);
        }}
      />
      <label
        className="min-h-[250px] bg-white border border-dashed border-border rounded-md flex items-center justify-center flex-col cursor-pointer gap-2 relative"
        htmlFor="thumbnail"
        onDrop={(e) => {
          e.preventDefault();
          previewFunction(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {thumbnail ? (
          <div className="flex flex-col p-6">
            {isVideo ? (
              <VideoPlayer src={thumbnail} />
            ) : (
              <img
                src={thumbnail}
                alt=""
                className="h-full w-full rounded-md"
              />
            )}
            <button
              type="button"
              className="text-richblack-300 underline mt-2"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {" "}
            <p className="bg-richblack-800 p-3 rounded-full text-yellow">
              <IoMdCloudUpload fontSize={35} />
            </p>
            <p className="text-richblack-200 text-[15px] w-[60%] 400px:w-[45%] text-center">
              Drag and Drop an {isVideo ? "video" : "image"} or click to{" "}
              <span className="text-yellow50">Browse</span> files
            </p>
          </>
        )}
      </label>
    </div>
  );
};

export default Upload;
