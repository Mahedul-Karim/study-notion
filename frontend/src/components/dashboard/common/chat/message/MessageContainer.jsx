import React, { useEffect, useMemo } from "react";
import Image from "../Image";
import MessageList from "./MessageList";
import Spinner from "../../../../ui/Spinner";
import { useData } from "../../../../../hooks/useData";
import { useDispatch, useSelector } from "react-redux";
import { setAllMessages } from "../../../../../store/slices/chat";

const MessageContainer = () => {
  const { selectedChat, messages } = useSelector((state) => state.chat);

  const { data, isPending } = useData({
    key: [`message-${selectedChat?._id}`, selectedChat?._id],
    endpoint: `/conversation/message?conversationId=${selectedChat?._id}`,
  });

  const dispatch = useDispatch();

  const allMessages = useMemo(() => data?.message, [data?.message]);

  useEffect(() => {
    dispatch(setAllMessages(allMessages));
  }, [allMessages]);

  return (
    <div className="bg-white h-[calc(500px_-_124px)] p-4 overflow-y-auto flex flex-col-reverse showScrollbar">
      {isPending ? (
        <div className="h-full flex items-center justify-center">
          <Spinner height="60px" width="30px" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages?.length > 0 &&
            messages?.map((message, i) => (
              <MessageList key={i} message={message} />
            ))}
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
