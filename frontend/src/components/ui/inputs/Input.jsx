import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Input = ({
  label,
  type,
  placeholder,
  required,
  name,
  onChange,
  disabled,
  value,
  register
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const returnType = () => {
    if (type !== "password") {
      return type;
    }

    if (showPassword) {
      return "text";
    } else {
      return "password";
    }
  };
 
 
  return (
    <>
      <label className="text-[15px] text-richblack-5 mb-1">
        {label}
        {required && (
          <sup className="text-pink-200 ml-[2px] top-[-2px] text-base">*</sup>
        )}
      </label>
      <input
        type={returnType()}
        required={required}
        className="bg-richblack-700 text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-richblack-500 disabled:cursor-not-allowed text-richblack-25"
        placeholder={placeholder}
        disabled={disabled}
        {...register}
      />
      {type === "password" && (
        <button
          className="absolute top-[50%] right-[10px]"
          onClick={() => setShowPassword((prev) => !prev)}
          type="button"
        >
          {!showPassword ? (
            <IoEyeOutline fontSize={24} />
          ) : (
            <IoEyeOffOutline fontSize={24} />
          )}
        </button>
      )}
    </>
  );
};

export default Input;
