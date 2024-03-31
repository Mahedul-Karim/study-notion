import React, { useState } from "react";
import OtpInput from "react-otp-input";
import FormButton from "../ui/inputs/FormButton";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { apiConnector } from "../util/api";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import { useOtp } from "../../hooks/useOtp";
import { useApi } from "../../hooks/useApi";

const VerifyEmail = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { signUpData } = useSelector((state) => state.auth);

  const { mutate: resendOtp } = useOtp(true);

  const { mutate, isPending } = useApi({
    success: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    error: (err) => {
      toast.error(err);
    },
  });

  const submitOtp = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      data: { ...signUpData, otp: value },
    };

    mutate({ endpoint: "user/signup", options });
  };

  const sendOtp = () => {
    toast.success("Sending OTP again");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: signUpData.email }),
    };

    resendOtp({ endpoint: "user/otp", options });
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-[calc(100vh_-_70px)] py-16">
      <form
        className="flex flex-col justify-center max-w-[450px] gap-1 mx-auto px-5"
        onSubmit={submitOtp}
      >
        <h2 className="text-xl 400px:text-2xl text-richblack-5 font-semibold text-start">
          Verify Email
        </h2>
        <p className="text-richblack-600 max-w-[380px] text-[14px] 400px:text-base">
          A verification code has been sent to you.Enter the code below
        </p>

        <OtpInput
          value={value}
          onChange={setValue}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              className="size-9 400px:size-12 p-2 rounded-md bg-richblack-700 text-richblack-5 text-center focus:outline-none focus:border-2 focus:border-solid focus:border-yellow"
              placeholder="-"
            />
          )}
          containerStyle={{
            justifyContent: "space-between",
            maxWidth: "380px",
            marginTop: "12px",
          }}
          skipDefaultStyles
        />
        <FormButton
          extraClass={"!mt-5 flex items-center justify-center"}
          type="submit"
        >
          {isPending ? <Spinner button /> : "Verify Email"}
        </FormButton>
        <div className="flex items-center justify-between mt-2 400px:mt-4">
          <Link
            className="text-[14px] 400px:text-base text-richblack-5 flex items-center gap-1 text-center"
            to={"/signup"}
          >
            <FaArrowLeft />
            Back to Signup
          </Link>
          <button
            className="text-[14px] 400px:text-base text-blue-200 flex items-center gap-1"
            type="button"
            onClick={sendOtp}
          >
            <FaClockRotateLeft /> Resend email
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
