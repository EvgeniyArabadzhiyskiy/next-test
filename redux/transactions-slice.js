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

    setPrevPage: (state) => {
      state.pageNum -= 1;
    },

    setInitialTransactions: (state, action) => {
      state.transactions = action.payload;
    },

  
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
    // console.log("builder.addCase  HYDRATE:", HYDRATE);


      if (state.transactions.length === 0) {
        // console.log('TRANSA');
        state.transactions = action.payload.transactions.transactions
        state.pageNum = action.payload.transactions.pageNum
      }


      // let nextState = {
      //   ...state,
      //   ...action.payload.transactions,
      // };

      // if (state.transactions.length > 0) {
      //   nextState.transactions = JSON.parse(JSON.stringify(state.transactions));
      //   nextState.pageNum = state.pageNum;
      // }

      // return nextState;
    });
  },
});

export const {
  getTransactions,
  setNextPage,
  setPrevPage,
  setInitialTransactions,
  setLoading,
} = transactionsSlice.actions;

export const transactionReducer = transactionsSlice.reducer;
