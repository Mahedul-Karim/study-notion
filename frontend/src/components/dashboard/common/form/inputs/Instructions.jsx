import React, { useState } from "react";
import Input from "../../../../ui/inputs/Input";

const Instructions = ({ instructions, setInstructions }) => {
  const [instruction, setInstruction] = useState("");

  const clearInstruction = (ins) => {
    setInstructions((prev) => prev.filter((inst) => inst !== ins));
  };

  return (
    <div>
      <label className="text-[15px] text-richblack-5 mb-1">
        Instructions/Requirements
        <sup className="text-pink-200 ml-[2px] top-[-2px] text-base">*</sup>
      </label>
      <input
        type={"text"}
        className="bg-richblack-700 text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-richblack-500 disabled:cursor-not-allowed text-richblack-25"
        disabled={false}
        onChange={(e) => setInstruction(e.target.value)}
        value={instruction}
      />

      <button
        type="button"
        className="text-yellow font-semibold mt-1"
        onClick={() => {
          setInstructions((prev) => [...prev, instruction]);
          setInstruction("");
        }}
      >
        Add
      </button>
      <div className="flex flex-col gap-2">
        {instructions?.length > 0 &&
          instructions?.map((ins, i) => (
            <p
              className="text-[17px] font-semibold flex items-center gap-2"
              key={i}
            >
              {ins}
              <span
                className="text-[12px] text-richblack-300 cursor-pointer"
                onClick={clearInstruction.bind(null, ins)}
              >
                clear
              </span>
            </p>
          ))}
      </div>
    </div>
  );
};

export default Instructions;
