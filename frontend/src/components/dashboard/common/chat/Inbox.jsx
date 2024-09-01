import React from "react";
import Image from "./Image";
import { useSelector } from "react-redux";

const Inbox = ({ onClick, conversation,index }) => {
  const { user } = useSelector((state) => state.profile);
  const { onlineUsers,activeChat } = useSelector((state) => state.chat);

  const handleClick = () => {
    if (document.body.clientWidth <= 640) {
      onClick();
    }
  };

  const recieverDetails =
    conversation?.creatorId?._id === user?._id
      ? conversation?.recieverId
      : conversation?.creatorId;

  return (
    <div
      className={`flex items-center justify-between p-3 hover:bg-background cursor-pointer ${index === activeChat && 'sm:bg-background'}`}
      onClick={handleClick}
    >
      <div className="flex gap-2">
        <Image
          src={recieverDetails?.image}
          isActive={onlineUsers?.includes(recieverDetails?._id)}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-[15px]">{recieverDetails?.firstName+" "+recieverDetails?.lastName}</p>
          <p className="text-[13px] text-richblack-400 line-clamp-1">
            {conversation?.lastMessageSender === recieverDetails?._id ? conversation?.lastMessage : `You:${conversation?.lastMessage}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
