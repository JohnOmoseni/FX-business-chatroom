import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencies: [],
  baseCurrency: "USD",
  selectedCurrency: null,
  agreedExchangedRate: null,
  amountToSend: "",
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
  userAccounts: [{ balance: "0.00", currency: "NGN" }],
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
      state.agreedExchangedRate = parseInt(payload).toFixed(2);
    },
    setAmountToSend: (state, { payload }) => {
      state.amountToSend = parseInt(payload).toFixed(2);
    },
    setCurrencies: (state, { payload }) => {
      state.currencies = payload;
    },
    setTransactions: (state, { payload }) => {
      state.transactions = [...state.transactions, payload];
      state.lastTransaction = payload;
    },
    setAccounts: (state, { payload }) => {
      state.userAccounts = [...state.userAccounts, payload];
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
} = fxSlice.actions;
