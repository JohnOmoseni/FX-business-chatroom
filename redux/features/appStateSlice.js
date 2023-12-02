import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenu: true,
  visiblePane: {
    theme: "dark",
    showChat: false,
    showRightPane: true,
    dropdown: false,
  },
  screenSize: undefined,
};

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setActivePane: (state, { payload }) => {
      const { id, val } = payload;
      state.visiblePane = { ...state.visiblePane, [id]: val };
    },
    setScreenSize: (state, { payload }) => {
      state.screenSize = payload;
    },
  },
});

export default appStateSlice.reducer;
export const { setActiveMenu, setActivePane, setScreenSize } =
  appStateSlice.actions;
