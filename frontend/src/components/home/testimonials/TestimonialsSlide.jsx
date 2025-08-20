import React from "react";

const TestimonialsSlide = ({ src, paragraph, name }) => {
  return (
    <blockquote className="bg-background rounded-2xl px-4 400px:px-8 pt-10 sm:pt-20 pb-6 shrink-0 w-full relative z-[1] overflow-clip">
      <img
        src={"/assets/qute.png"}
        alt=""
        className="absolute top-[-10px] left-[-10px] z-[-1] opacity-20"
      />
      <figcaption className="text-center select-none italic text-black/60">&ldquo;{paragraph}&rdquo;</figcaption>
      <div className="mt-4 flex flex-col gap-2 items-center justify-center">
        <img
          src={src}
          className="size-16 object-cover rounded-full"
        />
        <p className="text-xl font-bold text-secondary">{name}</p>
      </div>
    </blockquote>
  );
};

export default TestimonialsSlide;
