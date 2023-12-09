import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAccount: null,
};

const fxSlice = createSlice({
  name: "fxState",
  initialState: initialState,
  reducers: {
    setBalance: (state, { payload }) => {
      state.users = payload;
    },
  },
});

export default fxSlice.reducer;
export const { setBalance } = fxSlice.actions;
