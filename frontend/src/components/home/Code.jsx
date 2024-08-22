import React, { useEffect, useRef } from "react";

const Code = ({ text, loop }) => {
  const spanRef = useRef();

  const startWriting = () => {
    return new Promise((resolve) => {
      let i = 0;

      const interval = setInterval(() => {
        const span = spanRef.current;

        if (!span) {
          clearInterval(interval);
          resolve();
        }

        span && (span.textContent = text.substring(0, i));
        i++;
        if (i > text.length) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  };

  const pause = () => {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve();
        clearTimeout(timeout);
      }, 5000);
    });
  };

  const deleteText = () => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const span = spanRef.current;

        if (!span) {
          clearInterval(interval);
          resolve();
        }

        span && (span.textContent = span?.textContent?.substring(
          0,
          span?.textContent?.length - 1
        ));

        if (span?.textContent?.length === 0) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  };

  useEffect(() => {
    const queue = [startWriting, pause, deleteText, pause];

    const startTyping = async () => {
      let func = queue.shift();

      while (func !== null) {
        await func();
        if (loop) {
          queue.push(func);
        }
        func = queue.shift();
      }
    };

    if (spanRef.current) {
      startTyping();
    }
  }, []);

  return (
    <span
      className={`whitespace-pre-wrap cursorAnimation transition-all duration-300 origin-center`}
      ref={spanRef}
    ></span>
  );
};

export default Code;
