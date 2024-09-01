import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  messages: [],
  selectedChat: null,
  onlineUsers: [],
  activeChat: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
      
    },
    setSelectedChat(state, action) {
      const { index, chatObject } = action.payload;

      if (index) {
        state.activeChat = index;
        state.selectedChat = state.conversations[index];
      } else {
        state.selectedChat = chatObject;
      }
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setAllMessages(state, action) {
      state.messages = action.payload;
    },
    setMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const {
  setConversations,
  setSelectedChat,
  setOnlineUsers,
  setAllMessages,
  setMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
