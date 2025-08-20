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
      <div className={`flex flex-col gap-3 ${order1}`}>
        <h2 className="text-richblack-500 font-bold text-3xl">
          {title}
        </h2>
        <p className="text-richblack-300 font-medium">{paragraph}</p>
        <div className="flex items-start 400px:items-center gap-4">
          <Button yellow to={btn1?.to}>
            {btn1?.text}
          </Button>
          <Button to={btn2?.to}>{btn2?.text}</Button>
        </div>
      </div>
      <div
        className={`code-border w-full flex py-2 relative background__blur--${blur} ${order2}`}
      >
        <Code text={text} loop textColor={textColor} />
      </div>
    </div>
  );
};

export default CodeBlock;
