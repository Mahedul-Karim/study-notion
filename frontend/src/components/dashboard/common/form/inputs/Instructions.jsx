import React, { useState } from "react";
import Input from "../../../../ui/inputs/Input";

const Instructions = ({ instructions, setInstructions }) => {
  const [instruction, setInstruction] = useState("");

  const clearInstruction = (ins) => {
    setInstructions((prev) => prev.filter((inst) => inst !== ins));
  };

  return (
    <div>
      <label className="text-[15px] text-richblack-600 mb-1">
        Instructions/Requirements
        <sup className="text-pink-200 ml-[2px] top-[-2px] text-base">*</sup>
      </label>
      <input
        type={"text"}
        className="bg-white text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 border border-solid border-border"
        disabled={false}
        onChange={(e) => setInstruction(e.target.value)}
        value={instruction}
      />

      <button
        type="button"
        className="text-white bg-tertiary px-4 rounded-md py-1 font-semibold mt-1"
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
