import { createSlice } from "@reduxjs/toolkit";

const initialChatState = {
  user: null,
  chatId: "",
  isPrivateChat: false,
  businessProfile: null,
  users: [],
  userChats: [],
};

const chatSlice = createSlice({
  name: "chatContext",
  initialState: initialChatState,
  reducers: {
    setChangeUser: (state, { payload }) => {
      const { currentUser, user } = payload;
      const combinedId =
        currentUser?.uid > user?.uid
          ? currentUser?.uid + user?.uid
          : user?.uid + currentUser?.uid;
      state.user = user;
      state.chatId = combinedId;
    },
    setBusinessProfile: (state, { payload }) => {
      state.businessProfile = payload;
    },
    setIsPrivateChat: (state, { payload }) => {
      state.isPrivateChat = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setUserChats: (state, { payload }) => {
      state.userChats = payload;
    },
  },
});

export default chatSlice.reducer;
export const {
  setChangeUser,
  setBusinessProfile,
  setIsPrivateChat,
  setUsers,
  setUserChats,
} = chatSlice.actions;
