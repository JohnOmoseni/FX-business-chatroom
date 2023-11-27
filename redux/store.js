import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./features/usersSlice";
import AuthUserReducer from "./features/authUserSlice";
import ChatReducer from "./features/chatSlice";

const store = configureStore({
  reducer: {
    users: UsersReducer,
    userChat: ChatReducer,
    authUser: AuthUserReducer,
  },
});

export default store;
