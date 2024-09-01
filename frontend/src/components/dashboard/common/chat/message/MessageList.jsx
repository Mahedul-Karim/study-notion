import React from "react";
import Image from "../Image";
import { useSelector } from "react-redux";

const MessageList = ({ message }) => {
  const { user } = useSelector((state) => state.profile);

  const senderId = message?.senderId;
  const recieverId = message?.recieverId;
  const text = message?.text;
  const haveImage = message?.haveImage;
  const imgSrc = message?.imgSrc;

  const userIsSender = senderId?._id === user?._id;


  return (
    <>
      <div
        className={`flex flex-col gap-4 ${
          userIsSender ? "items-end" : "items-start"
        }`}
      >
        <p
          className={`bg-blue-5 w-[80%] 400px:w-[60%] py-3 px-5 rounded-lg text-secondary relative after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-t-[12px] after:border-t-blue-5 after:absolute ${
            userIsSender ? "after:right-2" : "after:left-2"
          }  after:-bottom-[12px]`}
        >
          {haveImage ? (
            <img className="w-full object-cover h-48 rounded-lg" src={imgSrc} />
          ) : (
            text
          )}
        </p>
        <Image
          showStatus={false}
          src={senderId?.image}
        />
      </div>
    </>
  );
};

export default MessageList;
