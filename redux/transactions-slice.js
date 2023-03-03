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
      state.transactions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      let nextState = {
        ...state,
        ...action.payload.transactions,
      };

      if (state.transactions.length > 0) {
        nextState.transactions = state.transactions;
        nextState.pageNum = state.pageNum;
        // nextState = state
      }

      return nextState;
    });
  },
});

export const {
  getTransactions,
  setNextPage,
  setInitialTransactions,
  setLoading,
} = transactionsSlice.actions;

export const transactionReducer = transactionsSlice.reducer;
