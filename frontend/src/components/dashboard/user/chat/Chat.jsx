import React, { useRef, useState } from "react";
import Heading from "../../common/Heading";
import Conversation from "../../common/chat/Conversation";
import Messages from "../../common/chat/Messages";

const Chat = () => {
  

  const [openList, setOpenList] = useState(false);


  const openMessageList=()=>{

    if(document.body.offsetWidth >= 640){
      return;
    }
    setOpenList(prev => !prev);
  }

  

  return (
    <>
      <Heading>Chats</Heading>
      <div
        className={`bg-background border border-solid border-border rounded-md grid grid-cols-[100%_100%] sm:grid-cols-[0.5fr_1fr] transition-all duration-300 ${
          openList ? "-translate-x-[100%] sm:translate-x-0" : "translate-x-0"
        }`}
      >
        <Conversation open={openList} handleOpenList={openMessageList}/>
        <Messages handleOpenList={openMessageList} open={openList}/>
      </div>
    </>
  );
};

export default Chat;
