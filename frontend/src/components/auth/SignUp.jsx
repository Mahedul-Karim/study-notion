import React, { useState, useReducer } from "react";
import Input from "../ui/inputs/Input";
import FormButton from "../ui/inputs/FormButton";
import { signupReducer } from "../../store/reducer/reducer";
import { signUpData } from "../../store/slices/auth";
import { useMutation } from "@tanstack/react-query";
import { apiConnector } from "../util/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useDispatch } from "react-redux";
import { useOtp } from "../../hooks/useOtp";
import Container from "../layout/Container";
import Label from "../dashboard/common/form/inputs/Label";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const BUTTON_VALUE = ["Student", "Instructor"];

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "Student",
};

const SignUp = () => {
  const [state, dispatchFn] = useReducer(signupReducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const reduxDispatch = useDispatch();

  const { mutate, isPending } = useOtp();

  const formSubmit = (e) => {
    e.preventDefault();

    if (isPending) return;

    reduxDispatch(signUpData({ ...state }));

    const options = {
      method: "POST",
      data: { email: state.email },
    };

    mutate({ endpoint: "user/otp", options });
  };

  return (
    <div className="bg-white py-20 min-h-[calc(100vh_-_70px)] ">
      <Container extraClass={"grid md:grid-cols-2 place-items-center"}>
        <div className="flex flex-col gap-2 w-11/12 max-w-[450px]">
          <h2 className="text-3xl font-semibold text-richblack-700">
            Join the millions learning to code with StudyNotion for free
          </h2>
          <p className="text-richblack-500">
            Build skills for today, tomorrow, and beyond.
            <span className="italic text-[#FF725E] font-bold block">
              Education to future-proof your career.
            </span>
          </p>

          <form className="flex flex-col gap-3" onSubmit={formSubmit}>
            <div className="bg-[#FF725E]/[0.2] w-max p-1 flex items-center gap-1 rounded-full">
              {BUTTON_VALUE.map((val, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${
                    val === state.accountType && "bg-[#FF725E] text-white"
                  } px-4 py-2 rounded-full`}
                  onClick={() =>
                    dispatchFn({ type: "ACCOUNT_TYPE", payload: val })
                  }
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex 400px:items-center gap-4 flex-col 400px:flex-row">
              <div>
                <Label>First Name</Label>
                <input
                  type="text"
                  className="bg-white text-base p-3 focus:outline-none rounded-lg w-full  relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-400 border border-solid border-[#ffdeda]"
                  disabled={isPending}
                  placeholder={"Enter first name"}
                  onChange={(e) =>
                    dispatchFn({ type: "FIRST_NAME", payload: e.target.value })
                  }
                  value={state.firstName}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <input
                  type="text"
                  className="bg-white text-base p-3 focus:outline-none rounded-lg w-full  relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-400 border border-solid border-[#ffdeda]"
                  placeholder={"Enter last name"}
                  disabled={isPending}
                  onChange={(e) =>
                    dispatchFn({ type: "LAST_NAME", payload: e.target.value })
                  }
                  value={state.lastName}
                />
              </div>
            </div>
            <div>
              <Label>Email Address</Label>
              <input
                type="text"
                className="bg-white text-base p-3 focus:outline-none rounded-lg w-full  relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-400 border border-solid border-[#ffdeda]"
                placeholder={"Enter email address"}
                disabled={isPending}
                onChange={(e) =>
                  dispatchFn({ type: "EMAIL", payload: e.target.value })
                }
                value={state.email}
              />
            </div>
            <div className="flex 400px:items-center gap-4 flex-col 400px:flex-row">
              <div className="relative">
                <Label>Create Password</Label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-white text-base p-3 focus:outline-none rounded-lg w-full  relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-400 border border-solid border-[#ffdeda]"
                  placeholder={"Enter Password"}
                  disabled={isPending}
                  onChange={(e) =>
                    dispatchFn({ type: "PASSWORD", payload: e.target.value })
                  }
                  value={state.password}
                />
                {/* <button
                  className="absolute top-[50%] right-[10px]"
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                >
                  {!showPassword ? (
                    <IoEyeOutline fontSize={24} />
                  ) : (
                    <IoEyeOffOutline fontSize={24} />
                  )}
                </button> */}
              </div>
              <div className="relative">
                <Label>Confirm Password</Label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-white text-base p-3 focus:outline-none rounded-lg w-full  relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-400 border border-solid border-[#ffdeda]"
                  placeholder={"Confirm Password"}
                  disabled={isPending}
                  onChange={(e) =>
                    dispatchFn({
                      type: "CONFIRM_PASSWORD",
                      payload: e.target.value,
                    })
                  }
                  value={state.confirmPassword}
                />
                {/* <button
                  className="absolute top-[50%] right-[10px]"
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                >
                  {!showPassword ? (
                    <IoEyeOutline fontSize={24} />
                  ) : (
                    <IoEyeOffOutline fontSize={24} />
                  )}
                </button> */}
              </div>
            </div>
            <FormButton
              extraClass={"!mt-4 flex items-center justify-center"}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Sign Up"}
            </FormButton>
          </form>
        </div>
        <div
          className="hidden md:block w-11/12 max-w-[450px] relative z-[1]"
       
        >
          <img
            src="/assets/login-img.png"
            className="w-full h-full object-cover"
          />
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
