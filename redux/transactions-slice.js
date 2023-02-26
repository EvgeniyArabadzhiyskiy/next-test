import { createSlice } from "@reduxjs/toolkit";

import { HYDRATE } from "next-redux-wrapper";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    pageNum: 1,
  },

  reducers: {
    getTransactions: (state, action) => {
      state.transactions = [...state.transactions, ...action.payload];
    },

    setNextPage: (state) => {
      state.pageNum += 1;
    },

    setInitialTransactions: (state, action) => {
      
      if (action.type === HYDRATE) {
        state.transactions = [777777]
      } else {
        state.transactions = action.payload;
      }
    },
  },
});

export const {
  getTransactions,
  setNextPage,
  setInitialTransactions,
  setLoading,
} = transactionsSlice.actions;

export const transactionReducer = transactionsSlice.reducer;
