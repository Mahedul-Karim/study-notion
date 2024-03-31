import { useMutation } from "@tanstack/react-query";
import React from "react";
import { apiConnector } from "../components/util/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useOtp = (isOtpInput = false) => {
  const navigate = useNavigate();

  const { mutate, isPending,isSuccess } = useMutation({
    mutationFn: ({ endpoint, options }) => apiConnector(endpoint, options),
    onSuccess: (data) => {
      if (!isOtpInput) {
        navigate("/verify-email");
      }
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending,isSuccess };
};
