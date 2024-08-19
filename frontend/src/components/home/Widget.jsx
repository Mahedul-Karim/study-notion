import React, { useEffect, useState } from "react";

const Widget = ({ src, text, number, duration, unit }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let num = 0;

    const interVal = setInterval(() => {
      setCount(num);
      if (number === num) {
        clearInterval(interVal);
      }
      num++;
    }, duration);

    return () => clearInterval(interVal);
  }, []);

  return (
    <div className="bg-white border-solid border border-[#e9ecef] rounded-[20px] px-4 flex items-center gap-2 py-4 400px:py-6 transition-all duration-300 hover:-translate-y-[20px]">
      <img src={`${src}`} alt="" className="size-10 400px:size-16" />
      <div className="flex flex-col">
        <p className="text-sm 400px:text-lg font-bold num">
          {count}
          {unit}
        </p>
        <p className="text-richblack-600 400px:text-base text-xs">{text}</p>
      </div>
    </div>
  );
};

export default Widget;
