import { useMutation } from "@tanstack/react-query";
import React from "react";
import { apiConnector } from "../components/util/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";

export const useOtp = (isOtpInput = false) => {
  const navigate = useNavigate();

  const { success, error, warning } = useToast();

  const { mutate, isPending,isSuccess } = useMutation({
    mutationFn: ({ endpoint, options }) => apiConnector(endpoint, options),
    onSuccess: (data) => {
      if (!isOtpInput) {
        navigate("/verify-email");
      }
      success(data.message);
    },
    onError: (err) => {
      error(err.message);
    },
  });

  return { mutate, isPending,isSuccess };
};
