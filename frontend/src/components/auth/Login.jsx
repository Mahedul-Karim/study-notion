import React, { useState } from "react";

import FormButton from "../ui/inputs/FormButton";
import { Link, useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import { useApi } from "../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/profile";
import Label from "../dashboard/common/form/inputs/Label";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useToast } from "../../hooks/useToast";

const Login = () => {
  const [email, setEmail] = useState(
    "test@gmail.com(user)/test2@gmail.com(instructor)"
  );
  const [password, setPassword] = useState("test1234");
  const [showPassword, setShowPassword] = useState(false);

  const { success, error, warning } = useToast();

  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useApi({
    success: (data) => {
      success("Login success");
      navigate("/dashboard/user");
      localStorage.setItem("token", JSON.stringify(data?.token));
      dispatch(setUser(data.user));
    },
    error: (err) => {
      error(err);
    },
  });

  const formSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      data: { email, password },
    };

    mutate({ endpoint: "user/login", options });
  };

  if (user) {
    return navigate("/");
  }

  return (
    <div className="bg-white min-h-[calc(100vh_-_70px)] py-20 text-richblack-25">
      <Container extraClass={"grid md:grid-cols-2 place-items-center"}>
        <div className="flex flex-col gap-2 w-11/12 max-w-[450px]">
          <h2 className="text-3xl font-semibold text-richblack-700">
            Welcome back
          </h2>
          <p className="text-richblack-500">
            Build skills for today, tomorrow, and beyond.
            <span className="italic text-primary font-bold block">
              Education to future-proof your career.
            </span>
          </p>

          <form className="flex flex-col gap-3" onSubmit={formSubmit}>
            <div>
              <Label>Email Address</Label>
              <input
                type="email"
                className="bg-white text-base p-3 focus:outline-none rounded-lg w-full  relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-400 border border-solid border-secondary/20"
                placeholder={"test@gmail.com/test2@gmail.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="relative">
              <Label>Password</Label>
              <input
                type={showPassword ? "text" : "password"}
                className="bg-white text-base p-3 focus:outline-none rounded-lg w-full  relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-400 border border-solid border-secondary/20"
                placeholder={"test1234"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
              />
              <button
                className="absolute top-[50%] right-[10px] text-richblack-700"
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                {!showPassword ? (
                  <IoEyeOutline fontSize={24} />
                ) : (
                  <IoEyeOffOutline fontSize={24} />
                )}
              </button>
              <Link
                to={"/forgot-password"}
                className="absolute top-[105%] right-0 text-secondary text-[13px]"
              >
                Forget password
              </Link>
            </div>
            <FormButton
              type="submit"
              extraClass={"flex items-center justify-center bg-primary"}
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Sign In"}{" "}
            </FormButton>
          </form>
          <p className="text-sm text-richblack-400">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="text-primary">
              Sign Up
            </Link>{" "}
          </p>
        </div>
        <div className="hidden md:block w-11/12 max-w-[450px] relative z-[1]">
          <img
            src="/assets/login-img.png"
            className="w-full h-full object-cover"
          />
        </div>
      </Container>
    </div>
  );
};

export default Login;
