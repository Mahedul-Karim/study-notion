import React, { useEffect, useRef, useState } from "react";

const Code = ({ text, loop, textColor }) => {
  const spanRef = useRef();
  const isMounted = useRef(true);
  const [lines, setLines] = useState([]);

  const typeText = async (text) => {
    let i = 0;
    // let currentLine = "";

    // const linesArray = lines.length > 0 ? [...lines] : [];

    while (isMounted.current && i <= text.length) {
      // currentLine += text[i] || "";

      // if (currentLine.endsWith("\n") || i === text.length) {
      //   linesArray.push(currentLine);
      //   setLines(()=>{
      //     return linesArray;
      //   });
      //   currentLine = "";
      // }
      // console.log(lines)
      spanRef.current.textContent = text.substring(0, i);
      i++;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  };

  const deleteText = async () => {
    // const linesArray = lines.length > 0 ? [...lines] : [];

    // console.log(lines)

    while (isMounted.current && spanRef.current.textContent.length > 0) {
      spanRef.current.textContent = spanRef.current.textContent.slice(0, -1);

      // if (linesArray.length > 0) {
      //   const lastLine = linesArray[linesArray.length - 1];

      //   if (lastLine.length > 0) {
      //     linesArray[linesArray.length - 1] = lastLine.slice(0, -1);
      //   } else {
      //     linesArray.pop();
      //   }
      // }
      // console.log(linesArray)
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  };

  const pause = () => {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve();
        clearTimeout(timeout);
      }, 5000);
    });
  };

  const runAnimation = async () => {
    await typeText(text);
    await pause();
    await deleteText();
    await pause();

    if (loop) {
      runAnimation();
    }
  };

  useEffect(() => {
    isMounted.current = true;

    if (spanRef.current) {
      runAnimation();
    }

    return () => {
      isMounted.current = false;
    };
  }, [text, loop]);

  return (
    <>
      <div className="hidden sm:flex flex-col text-richblack-400 basis-[10%] text-center">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div
        className={`${textColor} font-mono font-semibold text-[14px] leading-6 basis-[90%] shrink-0 pl-4 sm:pl-0 min-h-[290px] sm:min-h-fit`}
      >
        <span
          className={`whitespace-pre-wrap cursorAnimation transition-all duration-300 origin-center`}
          ref={spanRef}
        ></span>
      </div>
    </>
  );
};

export default Code;
