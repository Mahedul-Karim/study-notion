import React, { useEffect } from "react";
import Button from "../ui/Button";
import Code from "./Code";
const CodeBlock = ({
  order1 = "order-1",
  order2 = "order-2",
  blur,
  title,
  paragraph,
  btn1,
  btn2,
  textColor,
  text,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 justify-items-center">
      <div className={`flex flex-col gap-2 ${order1}`}>
        <h2 className="text-richblack-500 font-bold text-3xl 400px:text-4xl">
          {title}
        </h2>
        <p className="text-richblack-300 font-bold mt-4">{paragraph}</p>
        <div className="flex items-start 400px:items-center gap-6 mt-4">
          <Button yellow to={btn1?.to}>
            {btn1?.text}
          </Button>
          <Button to={btn2?.to}>{btn2?.text}</Button>
        </div>
      </div>
      <div
        className={`code-border w-full flex py-2 relative background__blur--${blur} ${order2}`}
      >
        <div className="hidden sm:flex flex-col text-richblack-400 basis-[10%] text-center">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div
          className={`${textColor} font-mono font-semibold text-[14px] leading-6 basis-[90%] shrink-0 pl-4 sm:pl-0 min-h-[290px] sm:min-h-fit`}
        >
          <Code text={text} loop />
          
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
