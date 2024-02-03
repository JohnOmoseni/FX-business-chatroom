import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthUserReducer from "./features/authUserSlice";
import AppStateReducer from "./features/appStateSlice";
import ChatReducer from "./features/chatSlice";
import FXStateReducer from "./features/fxSlice";

const store = configureStore({
	reducer: {
		usersState: ChatReducer,
		authUser: AuthUserReducer,
		appState: AppStateReducer,
		fxState: FXStateReducer,
	},
});

export default store;
