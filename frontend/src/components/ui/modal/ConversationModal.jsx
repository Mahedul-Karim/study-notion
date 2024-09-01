import React, { useEffect } from "react";
import Modal from "./Modal";
import Messages from "../../dashboard/common/chat/Messages";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../../../hooks/useApi";
import { setSelectedChat } from "../../../store/slices/chat";
import Spinner from "../Spinner";

const ConversationModal = ({ open, setOpen }) => {
  const { selectedChat } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const { mutate, isPending } = useApi({
    success: (data) => {
      console.log(data)
      dispatch(setSelectedChat({chatObject:data?.conversations}));
    },
    error: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    const options = {
      method: "POST",
      data: {
        creatorId: selectedChat?.creatorId?._id,
        recieverId: selectedChat?.recieverId?._id,
      },
    };

    if(!selectedChat?._id){

      mutate({ endpoint: "/conversation/first", options });
    }
  }, []);

  return (
    <Modal onClick={() => setOpen(false)}>
      <div className="bg-white rounded-md max-w-[80%] sm:max-w-[450px] w-11/12 border border-solid border-border flex flex-col gap-3 overflow-y-auto h-[350px] md:h-auto">
        {" "}
        {isPending ? (
          <div className="h-[350px] md:h-[500px] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Messages open />
        )}
      </div>{" "}
    </Modal>
  );
};

export default ConversationModal;
