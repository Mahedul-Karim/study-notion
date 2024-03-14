import React from "react";

const Video = ({ link, extraClass }) => {
  return (
    <video
      className={`shadow-[20px_20px_rgba(255,255,255)] ${extraClass}`}
      autoPlay
      muted
      loop
    >
      <source src={link} />
    </video>
  );
};

export default Video;
