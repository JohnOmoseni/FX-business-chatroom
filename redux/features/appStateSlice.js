import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPane: false,
  showRightPane: false,
  isCurrentUser: false,
  visiblePane: {
    theme: "dark",
    showChat: false,
    showChatRoom: false,
    dropdown: false,
    privateChat: false,
  },
  rightPane: {
    userProfile: false,
    businessProfile: false,
    tradeWallet: false,
    userWallet: true,
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
      const { id, val, isCurrentUser } = payload;
      state.showPane = true;
      state.showRightPane = true;
      state.isCurrentUser = isCurrentUser;

      for (let key in state.rightPane) {
        state.rightPane[key] = false;
      }
      state.rightPane = { ...state.rightPane, [id]: val };
    },
    setClosePane: (state, { payload }) => {
      const { id, val } = payload;
      state.showPane = false;
      state.visiblePane = { ...state.visiblePane, [id]: val };
    },
    setCloseRightPane: (state, { payload }) => {
      state.showPane = false;
      state.showRightPane = false;
      for (let key in state.rightPane) {
        state.rightPane[key] = false;
      }
    },
    setScreenSize: (state, { payload }) => {
      state.screenSize = payload;
    },
  },
});

export default appStateSlice.reducer;
export const {
  setActivePane,
  setClosePane,
  setScreenSize,
  setVisibleRightPane,
  setCloseRightPane,
} = appStateSlice.actions;
