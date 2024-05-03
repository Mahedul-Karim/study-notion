import React from "react";

export const useThumbnail = (setThumbnail) => {
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
  return { showThumbnailPreview };
};
