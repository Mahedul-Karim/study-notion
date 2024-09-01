import React, { useEffect, useMemo } from "react";
import Inbox from "./Inbox";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../ui/Spinner";
import { useData } from "../../../../hooks/useData";
import {
  setConversations,
  setSelectedChat,
} from "../../../../store/slices/chat";

const Conversation = ({ extraClass = "", open, handleOpenList }) => {
  const { conversations } = useSelector((state) => state.chat);

  const { data, isPending } = useData({
    key: ["userConversations"],
    endpoint: "/conversation",
  });

  const allConversations = useMemo(
    () => data?.conversations,
    [data?.conversations]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setConversations(allConversations));
    dispatch(setSelectedChat({ chatObject: allConversations?.[0] }));
  }, [allConversations]);

  return (
    <div
      className={`bg-white border-r border-solid border-border flex flex-col h-[500px] overflow-y-auto ${extraClass} showScrollbar ${
        open ? "opacity-0 sm:opacity-100" : "opacity-100"
      }`}
    >
      {isPending && (
        <div className="flex items-center justify-center h-full">
          <Spinner height="60px" width="30px" />
        </div>
      )}
      {!isPending &&
        conversations?.length > 0 &&
        conversations?.map((conv, i) => (
          <Inbox onClick={handleOpenList} key={i} conversation={conv} index={i}/>
        ))}
      {!isPending && conversations?.length === 0 && (
        <p className="h-full text-center flex items-center justify-center">
          No conversations yet!
        </p>
      )}
    </div>
  );
};

export default Conversation;
