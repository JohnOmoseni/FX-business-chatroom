import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./features/usersSlice";
import AuthUserReducer from "./features/authUserSlice";
import ChatReducer from "./features/chatSlice";
import AppStateReducer from "./features/appStateSlice";

const store = configureStore({
  reducer: {
    users: UsersReducer,
    userChat: ChatReducer,
    authUser: AuthUserReducer,
    appState: AppStateReducer,
  },
});

console.log(store.getState());

export default store;
