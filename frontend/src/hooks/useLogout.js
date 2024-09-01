import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useApi } from "./useApi";
import toast from "react-hot-toast";
import { setUser } from "../store/slices/profile";
import { socket } from '../components/util/helpers'
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const queryClient = useQueryClient()

  const navigate = useNavigate();

  const { mutate, isPending } = useApi({
    success: () => {
      socket.emit('logout')
      toast.success("Logged Out successfully!");
      dispatch(setUser(null));
      navigate("/");
      queryClient.invalidateQueries();
    },
    error: (err) => {
      toast.error(err);
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
