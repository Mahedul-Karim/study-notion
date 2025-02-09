import React, { useEffect, useRef } from "react";

const Code = ({ text, loop }) => {
  const spanRef = useRef();
  const isMounted = useRef(true);

  const typeText = async (text) => {
    let i = 0;
    while (isMounted.current && i <= text.length) {
      spanRef.current.textContent = text.substring(0, i);
      i++;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  };

  const deleteText = async () => {
    while (isMounted.current && spanRef.current.textContent.length > 0) {
      spanRef.current.textContent = spanRef.current.textContent.slice(0, -1);
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
    <span
      className={`whitespace-pre-wrap cursorAnimation transition-all duration-300 origin-center`}
      ref={spanRef}
    ></span>
  );
};

export default Code;
