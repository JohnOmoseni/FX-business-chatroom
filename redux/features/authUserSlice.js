import { createSlice } from "@reduxjs/toolkit";

const initialAuthUser = {
	currentUser: {},
	isActive: false,
	isAuth: false,
};

const authUserSlice = createSlice({
	name: "authUser",
	initialState: initialAuthUser,
	reducers: {
		setCurrentuser: (state, action) => {
			state.currentUser = action.payload;
			state.isActive = true;
		},
		setIsAuth: (state, { payload }) => {
			state.isAuth = payload;
		},
	},
});

export default authUserSlice.reducer;
export const { setCurrentuser, setIsAuth } = authUserSlice.actions;
