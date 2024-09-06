import React, { useState } from "react";
import OtpInput from "react-otp-input";
import FormButton from "../ui/inputs/FormButton";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useOtp } from "../../hooks/useOtp";
import { useApi } from "../../hooks/useApi";
import { useToast } from "../../hooks/useToast";

const VerifyEmail = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { signUpData } = useSelector((state) => state.auth);

  const { mutate: resendOtp } = useOtp(true);

  const { success, error, warning } = useToast();

  const { mutate, isPending } = useApi({
    success: (data) => {
      success(data.message);
      navigate("/login");
    },
    error: (err) => {
      error(err);
    },
  });

  const submitOtp = (e) => {
    e.preventDefault();
    console.log(value);

    const options = {
      method: "POST",
      data: { ...signUpData, otp: value },
    };

    mutate({ endpoint: "user/signup", options });
  };

  const sendOtp = () => {
    success("Sending OTP again");
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
    <div className="flex items-center justify-center flex-col min-h-[calc(100vh_-_70px)] py-16 bg-background">
      <form
        className="flex flex-col justify-center max-w-[450px] gap-1 mx-auto px-5"
        onSubmit={submitOtp}
      >
        <h2 className="text-xl 400px:text-2xl text-richblack-600 font-semibold text-start">
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
              className="size-9 400px:size-12 p-2 rounded-md bg-white text-richblack-600 text-center focus:outline-none border border-solid border-border focus:border-secondary"
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
          {isPending ? "Verfifying..." : "Verify Email"}
        </FormButton>
        <div className="flex items-center justify-between mt-2 400px:mt-4">
          <Link
            className="text-[14px] 400px:text-base text-richblack-700 flex items-center gap-1 text-center"
            to={"/signup"}
          >
            <FaArrowLeft />
            Back to Signup
          </Link>
          <button
            className="text-[14px] 400px:text-base text-secondary flex items-center gap-1"
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
