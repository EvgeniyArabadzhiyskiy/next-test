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
      // console.log("action:", action.payload.transactions.transactions);
      return {
        ...state,
        ...action.payload.transactions,
      };
    });
  },

  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     // console.log("action:", action.payload.transactions.transactions);
  //     return {
  //       ...state,
  //       ...action.payload.transactions,
  //     };
  //   },
  // },
});

export const {
  getTransactions,
  setNextPage,
  setInitialTransactions,
  setLoading,
} = transactionsSlice.actions;

export const transactionReducer = transactionsSlice.reducer;
