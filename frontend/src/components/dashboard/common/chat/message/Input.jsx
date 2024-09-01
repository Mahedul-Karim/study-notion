import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useReciever } from "../../../../../hooks/useReciever";
import { useApi } from "../../../../../hooks/useApi";
import { setMessage } from "../../../../../store/slices/chat";
import { socket } from "../../../../util/helpers";
import { RxCross1 } from "react-icons/rx";

const Input = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  const { recieverDetails } = useReciever();

  const [image, setImage] = useState("");

  const { user } = useSelector((state) => state.profile);

  const [text, setText] = useState("");

  const { mutate } = useApi({
    success: () => {},
    error: () => {},
  });

  const handleImage = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImage(fileReader.result);
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("sendMessage", (message) => {
      dispatch(setMessage(message));
    });
  }, []);

  const submitMessage = (e) => {
    e.preventDefault();

    const senderId = {
      _id: user?._id,
      image: user?.image,
    };

    const message = {
      recieverId: recieverDetails?._id,
      text,
      ...(selectedChat?._id && { conversationId: selectedChat?._id }),
    };

    if (!selectedChat._id) {
      message.isFirst = true;
    }

    if (image) {
      delete message.text;
      message.haveImage = true;
      message.imgSrc = image;
      console.log(message);
    }

    socket.emit("getMessage", {
      ...message,
      senderId,
    });

    const options = {
      method: "POST",
      data: message,
    };

    dispatch(setMessage({ ...message, senderId }));
    if (!image) {
      text && mutate({ endpoint: "/conversation/message", options });
    }
    setText("");
    setImage("");
  };

  return (
    <form
      className="h-[50px] bg-background border-t border-solid border-border flex items-center px-4 gap-2 relative"
      onSubmit={submitMessage}
    >
      {image && (
        <div className="bg-white border-y border-solid border-border absolute w-full left-0 -top-20 flex items-center justify-between">
          <div className="size-20 relative">
            <img src={image} className="w-full h-full object-cover" />
            <button
              type="button"
              className="absolute top-2 right-2 bg-white rounded-xl p-1 text-xs"
              onClick={setImage.bind(null, "")}
            >
              <RxCross1 />
            </button>
          </div>
        </div>
      )}
      <div className="grow">
        <input
          type="text"
          className="bg-[#e6ebf5] px-4 rounded-md py-1 w-full focus:outline-none placeholder:text-sm text-sm"
          placeholder="Write your message...."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4 text-secondary">
        <input
          type="file"
          id="fileUpload"
          className="absolute opacity-0 invisible"
          onChange={handleImage}
        />
        <label type="button" htmlFor="fileUpload" className="cursor-pointer">
          <GrAttachment />
        </label>
        <button type="submit">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default Input;
