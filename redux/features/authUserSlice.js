import { createSlice } from "@reduxjs/toolkit";

const initialAuthUser = {
  currentUser: {},
  isLoggedIn: false,
  isActive: false,
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState: initialAuthUser,
  reducers: {
    setCurrentuser: (state, action) => {
      state.currentUser = action.payload;
      state.isActive = true;
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
  },
});

export default authUserSlice.reducer;
export const { setCurrentuser, setIsLoggedIn } = authUserSlice.actions;
