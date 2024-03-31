import React from "react";

const Img = ({ src, alt }) => {
  return (
    <img
      src={src}
      className="aspect-square size-10 400px:size-16 rounded-full object-cover"
      alt={alt}
    />
  );
};

export default Img;
