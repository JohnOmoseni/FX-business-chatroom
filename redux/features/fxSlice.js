import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencies: [],
  baseCurrency: "USD",
  selectedCurrency: null,
  agreedExchangedRate: null,
  amountToSend: "",
  transactions: [],
  lastTransaction: {
    currencySent: "",
    currencyReceived: "",
    amountSent: "",
    amountReceived: "",
    exchangeRate: "",
    timestamp: "",
    receiverID: "",
    fx: "USD/NGN",
  },
  userAccount: { balance: "0.00", currency: "NGN" },
};

const fxSlice = createSlice({
  name: "fxState",
  initialState: initialState,
  reducers: {
    setBalance: (state, { payload }) => {
      state.users = payload;
    },
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
    setSelectedCurrency: (state, { payload }) => {
      state.selectedCurrency = payload;
    },
    setAgreedExchangeRate: (state, { payload }) => {
      state.agreedExchangedRate = parseInt(payload).toFixed(2);
    },
    setAmontToSend: (state, { payload }) => {
      state.amountToSend = parseInt(payload).toFixed(2);
    },
    setCurrencies: (state, { payload }) => {
      state.currencies = payload;
    },
  },
});

export default fxSlice.reducer;
export const {
  setBalance,
  setBaseCurrency,
  setSelectedCurrency,
  setAgreedExchangeRate,
  setAmontToSend,
  setCurrencies,
} = fxSlice.actions;
