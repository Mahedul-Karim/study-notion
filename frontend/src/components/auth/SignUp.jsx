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
    <div className="bg-richblack-900 min-h-[calc(100vh_-_70px)] py-10 text-richblack-25">
      <Container extraClass={"grid md:grid-cols-2 place-items-center"}>
        <div className="flex flex-col gap-2 w-11/12 max-w-[450px]">
          <h2 className="text-3xl font-semibold">
            Join the millions learning to code with StudyNotion for free
          </h2>
          <p className="text-richblack-300">
            Build skills for today, tomorrow, and beyond.
            <span className="italic text-blue-200 font-bold block">
              Education to future-proof your career.
            </span>
          </p>

          <form className="flex flex-col gap-3" onSubmit={formSubmit}>
            <div className="bg-richblack-800 w-max p-1 flex items-center gap-1 rounded-full">
              {BUTTON_VALUE.map((val, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${
                    val === state.accountType && "bg-richblack-900"
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
                <Input
                  type={"text"}
                  required
                  label={"First Name"}
                  disabled={isPending}
                  placeholder={"Enter first name"}
                  onChange={(e) =>
                    dispatchFn({ type: "FIRST_NAME", payload: e.target.value })
                  }
                  value={state.firstName}
                />
              </div>
              <div>
                <Input
                  type={"text"}
                  required
                  label={"Last Name"}
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
              <Input
                type={"email"}
                required
                label={"Email Address"}
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
                <Input
                  type={"password"}
                  required
                  label={"Create Password"}
                  placeholder={"Enter Password"}
                  disabled={isPending}
                  onChange={(e) =>
                    dispatchFn({ type: "PASSWORD", payload: e.target.value })
                  }
                  value={state.password}
                />
              </div>
              <div className="relative">
                <Input
                  type={"password"}
                  required
                  label={"Confirm Password"}
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
              </div>
            </div>
            <FormButton
              extraClass={"!mt-4 flex items-center justify-center"}
              type="submit"
            >
              {isPending ? <Spinner button /> : "Sign Up"}
            </FormButton>
          </form>
        </div>
        <div
          className="hidden md:block w-11/12 max-w-[450px] relative z-[1]"
          id="bg__frame"
        >
          <img
            src="/assets/signup.webp"
            className="w-full h-full object-cover"
          />
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
