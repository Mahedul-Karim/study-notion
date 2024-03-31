import React from "react";
import Video from "../ui/Video";

const Banner = () => {
  return (
    <div className="mx-auto mt-10 mb-10 w-[90%] md:w-[70%] shadow-[0_0_20px_#118ab2]">
      <Video
        link={
          "https://res.cloudinary.com/dleogo48u/video/upload/v1710325954/banner.8e687823b1422880cc3f_iekpwi.mp4"
        }
        extraClass={"w-full"}
      />
    </div>
  );
};

export default Banner;
