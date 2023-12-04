import { configureStore } from "@reduxjs/toolkit";
import AuthUserReducer from "./features/authUserSlice";
import ChatReducer from "./features/chatSlice";
import AppStateReducer from "./features/appStateSlice";

const store = configureStore({
  reducer: {
    usersState: ChatReducer,
    authUser: AuthUserReducer,
    appState: AppStateReducer,
  },
});

console.log(store.getState());

export default store;
