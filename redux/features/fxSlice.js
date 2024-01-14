import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencies: [],
  baseCurrency: "USD",
  selectedCurrency: "",
  agreedExchangedRate: "",
  amountToSend: null,
  transactions: [],
  lastTransaction: {
    transactionId: "",
    currencySent: "",
    currencyReceived: "",
    chargedAmount: "",
    amount: "",
    exchangeRate: "",
    txType: "",
    fx: "USD/NGN",
    status: "",
    recipient: null,
    timestamp: "",
  },
  userAccounts: [],
  currentAccount: { balance: "0.00", currency: "NGN" },
};

const fxSlice = createSlice({
  name: "fxState",
  initialState: initialState,
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
    setSelectedCurrency: (state, { payload }) => {
      state.selectedCurrency = payload;
    },
    setAgreedExchangeRate: (state, { payload }) => {
      state.agreedExchangedRate = payload;
    },
    setAmountToSend: (state, { payload }) => {
      state.amountToSend = Number(payload);
    },
    setCurrencies: (state, { payload }) => {
      state.currencies = payload;
    },
    setTransactions: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.transactions = payload;
        state.lastTransaction = payload[payload?.length - 1];
      } else {
        state.transactions = [...state.transactions, payload];
        state.lastTransaction = payload;
      }
    },
    setAccounts: (state, { payload }) => {
      if (!Array.isArray(payload)) {
        state.userAccounts = [...state.userAccounts, payload];
        state.currentAccount = payload;
      } else {
        state.userAccounts = payload;
      }
    },
    setCurrentAccount: (state, { payload }) => {
      state.currentAccount = payload;
    },
    setAccountCurrency: (state, { payload }) => {
      state.currentAccount.currency = payload;
    },
    setAccountBalance: (state, { payload }) => {
      state.currentAccount.balance = payload;
      state.userAccounts = state.userAccounts.map((account) => {
        if (account.currency === state.currentAccount.currency) {
          account.balance = payload;
        }
        return account;
      });
    },
  },
});

export default fxSlice.reducer;
export const {
  setBaseCurrency,
  setSelectedCurrency,
  setAgreedExchangeRate,
  setAmountToSend,
  setCurrencies,
  setTransactions,
  setAccountBalance,
  setAccountCurrency,
  setAccounts,
  setCurrentAccount,
} = fxSlice.actions;
