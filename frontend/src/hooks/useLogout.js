import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useApi } from "./useApi";
import toast from "react-hot-toast";
import { setUser } from "../store/slices/profile";
import ConfirmationModal from "../components/ui/modal/ConfirmationModal";

export const useLogout = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mutate, isPending } = useApi({
    success: () => {
      toast.success("Logged Out successfully!");
      dispatch(setUser(null));
      navigate("/");
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
