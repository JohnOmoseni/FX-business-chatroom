import { createSlice } from "@reduxjs/toolkit";

const initialChatState = {
  user: null,
  chatId: "",
  isPrivateChat: false,
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
    setIsPrivateChat: (state, { payload }) => {
      state.isPrivateChat = payload;
    },
  },
});

export default chatSlice.reducer;
export const { setChangeUser, setIsPrivateChat } = chatSlice.actions;
