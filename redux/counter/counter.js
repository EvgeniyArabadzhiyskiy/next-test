import { createSlice } from "@reduxjs/toolkit";

const counterSlise = createSlice({
  name: "counter",

  initialState: {
    counter: 1,
  },

  reducers: {
    incrementCounter: (state, action) => {
      state.counter += 1;
    },

    decrementCounter: (state, action) => {
      state.counter -= 1;
    },
  },
});

export const { incrementCounter, decrementCounter } = counterSlise.actions;

export const counterReduser = counterSlise.reducer;
