import React from "react";

import VideoPlayer from "../../ui/VideoPlayer";

const Main = () => {
  return (
    <div className="flex flex-col gap-2 p-6">
      <VideoPlayer
        src={
          "https://res.cloudinary.com/dleogo48u/video/upload/v1710325954/banner.8e687823b1422880cc3f_iekpwi.mp4"
        }
      />
    </div>
  );
};

export default Main;
