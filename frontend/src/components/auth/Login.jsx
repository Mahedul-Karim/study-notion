import React, { useState } from "react";
import Input from "../ui/inputs/Input";
import FormButton from "../ui/inputs/FormButton";
import { Link } from "react-router-dom";
import Container from "../layout/Container";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import { useApi } from "../../hooks/useApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useApi({
    success: (data) => {
      toast.success("Login success");
    },
    error: (err) => {
      toast.error(err);
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

  return (
    <div className="bg-richblack-900 min-h-[calc(100vh_-_70px)] py-10 text-richblack-25">
      <Container extraClass={"grid md:grid-cols-2 place-items-center"}>
        <div className="flex flex-col gap-2 w-11/12 max-w-[450px]">
          <h2 className="text-3xl font-semibold">Welcome back</h2>
          <p className="text-richblack-300">
            Build skills for today, tomorrow, and beyond.
            <span className="italic text-blue-200 font-bold block">
              Education to future-proof your career.
            </span>
          </p>

          <form className="flex flex-col gap-3" onSubmit={formSubmit}>
            <div>
              <Input
                type={"email"}
                required
                label={"Email address"}
                placeholder={"Enter your email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="relative">
              <Input
                type={"password"}
                required
                label={"Password"}
                placeholder={"Enter your password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
              />
              <Link
                to={"/forgot-password"}
                className="absolute top-[105%] right-0 text-blue-200 text-[13px]"
              >
                Forget password
              </Link>
            </div>
            <FormButton
              type="submit"
              extraClass={"flex items-center justify-center"}
            >
              {isPending ? <Spinner button /> : "Sign In"}{" "}
            </FormButton>
          </form>
        </div>
        <div
          className="hidden md:block w-11/12 max-w-[450px] relative z-[1]"
          id="bg__frame"
        >
          <img
            src="/assets/login.webp"
            className="w-full h-full object-cover"
          />
        </div>
      </Container>
    </div>
  );
};

export default Login;
