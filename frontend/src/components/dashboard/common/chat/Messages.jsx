import React from "react";
import Input from "./message/Input";
import Header from "./message/Header";
import MessageContainer from "./message/MessageContainer";
import Spinner from "../../../ui/Spinner";

const Messages = ({ handleOpenList, open }) => {
  return (
    <div
      className={`bg-white ${
        open ? "opacity-100" : "opacity-0 sm:opacity-100"
      }`}
    >
      <Header handleOpenList={handleOpenList} />
      <MessageContainer />
      <Input />
    </div>
  );
};

export default Messages;
