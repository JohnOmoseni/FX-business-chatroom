import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPane: false,
  showRightPane: false,
  visiblePane: {
    theme: "dark",
    showChat: false,
    showChatRoom: false,
    dropdown: false,
    privateChat: false,
  },
  rightPane: {
    userProfile: false,
    tradeWallet: false,
    userWallet: false,
    currencyList: false,
  },
  screenSize: undefined,
};

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    setActivePane: (state, { payload }) => {
      const { id, val } = payload;
      state.showPane = true;
      state.visiblePane = { ...state.visiblePane, [id]: val };
    },
    setVisibleRightPane: (state, { payload }) => {
      const { id, val } = payload;
      state.showPane = true;
      state.showRightPane = true;
      state.rightPane = { ...state.rightPane, [id]: val };
    },
    setClosePane: (state, { payload }) => {
      const { id, val } = payload;
      state.showPane = false;
      state.visiblePane = { ...state.visiblePane, [id]: val };
    },
    setScreenSize: (state, { payload }) => {
      state.screenSize = payload;
    },
  },
});

export default appStateSlice.reducer;
export const {
  setActiveMenu,
  setActivePane,
  setClosePane,
  setScreenSize,
  setVisibleRightPane,
} = appStateSlice.actions;
