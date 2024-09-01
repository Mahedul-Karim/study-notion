import React from "react";
import { useSelector } from "react-redux";

export const useReciever = () => {
  const { selectedChat, onlineUsers } = useSelector((state) => state.chat);

  const { user } = useSelector((state) => state.profile);

  const recieverDetails =
    user?._id === selectedChat?.creatorId?._id
      ? selectedChat?.recieverId
      : selectedChat?.creatorId;

  const isActive = onlineUsers?.includes(recieverDetails?._id);

  return {
    recieverDetails,
    isActive,
  };
};
