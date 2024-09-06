import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useApi } from "./useApi";
import { setUser } from "../store/slices/profile";
import { socket } from '../components/util/helpers'
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";

export const useLogout = () => {
  const [showModal, setShowModal] = useState(false);

  const { success, error, warning } = useToast();

  const dispatch = useDispatch();

  const queryClient = useQueryClient()

  const navigate = useNavigate();

  const { mutate, isPending } = useApi({
    success: () => {
      socket.emit('logout')
      success("Logged Out successfully!");
      dispatch(setUser(null));
      localStorage.removeItem('token')
      navigate("/");
      queryClient.invalidateQueries();
    },
    error: (err) => {
      error(err);
    },
  });

  useEffect(() => {
    if (isPending) {
      setShowModal(false);
    }
  }, [isPending]);

  const logoutHandler = () => {
    const options = {
      method: "POST",
    };
    mutate({ endpoint: "user/logout", options });
  };

  

  return { showModal, setShowModal, logoutHandler, isPending };
};
