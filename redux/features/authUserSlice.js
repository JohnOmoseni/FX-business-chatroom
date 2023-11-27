import { createSlice } from "@reduxjs/toolkit";

const initialAuthUser = {
  currentUser: null,
  isAuth: false,
  isActive: false,
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState: initialAuthUser,
  reducers: {
    setCurrentuser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
      state.isActive = true;
    },
  },
});

export default authUserSlice.reducer;
export const { setCurrentuser } = authUserSlice.actions;
