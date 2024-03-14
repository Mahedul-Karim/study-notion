import React from "react";
import Button from "../ui/Button";
import { TypeAnimation } from "react-type-animation";
const CodeBlock = ({ order, title, paragraph, btn1, btn2, textColor,text }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 justify-items-center">
      <div className={`flex flex-col gap-2`} style={{ order: order?.[0] }}>
        <h2 className="text-white font-bold text-4xl">{title}</h2>
        <p className="text-richblack-300 font-bold mt-4">{paragraph}</p>
        <div className="flex flex-col 400px:flex-row items-start 400px:items-center gap-6 mt-4">
          <Button yellow to={btn1?.to}>
            {btn1?.text}
          </Button>
          <Button to={btn2?.to}>{btn2?.text}</Button>
        </div>
      </div>
      <div
        className={`code-border w-full flex py-2 relative background__blur--${order?.[0]}`}
        style={{ order: order?.[1] }}
      >
        <div className="flex flex-col text-richblack-400 basis-[10%] text-center">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className={`${textColor} font-semibold text-[16px] basis-[90%] shrink-0`}>
          <TypeAnimation
            sequence={[
              text,
              5000,
              "",
            ]}
            repeat={Infinity}
            style={{ whiteSpace: "pre-line" }}
            omitDeletionAnimation
            cursor
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
