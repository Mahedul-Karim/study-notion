import React, { useState } from "react";
import Input from "../ui/inputs/Input";
import FormButton from "../ui/inputs/FormButton";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { apiConnector } from "../util/api";
import Spinner from "../ui/Spinner";
import { useToast } from '../../hooks/useToast'

const ForgotPassword = () => {
  const [tokenSent, setTokenSent] = useState(false);
  const [email, setEmail] = useState("");

  const { success, error, warning } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ endpoint, options }) => apiConnector(endpoint, options),
    onSuccess:(data)=>{
        success(data.message);
        setTokenSent(true)
    },
    onError:(error)=>{
        error(error.message)
    }
  });

  const handleClick = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    mutate({ endpoint: "user/reset/token", options });
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-[calc(100vh_-_70px)] py-16">
      <div className="flex flex-col px-5 sm:px-0">
        <h2 className="text-2xl sm:text-3xl text-richblack-5 font-bold">
          {!tokenSent ? "Reset your password" : "Check email"}
        </h2>
        <p className="text-richblack-300 max-w-[450px] text-base sm:text-[18px] mt-4">
          {!tokenSent
            ? "Have no fear. We&apos;ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`}
        </p>
        <div className={`mt-2 ${tokenSent ? "hidden" : "block"}`}>
          <Input
            type={"email"}
            label={"Email Address"}
            required
            placeholder={"Enter email address"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {!tokenSent && (
          <FormButton onClick={handleClick} extraClass={"flex items-center justify-center"} >
            {isPending ? <Spinner button /> : "Submit"}
          </FormButton>
        )}
        <Link
          className="text-[14px] 400px:text-base text-richblack-5 flex items-center gap-1 text-center mt-3"
          to={"/login"}
        >
          <FaArrowLeft />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
