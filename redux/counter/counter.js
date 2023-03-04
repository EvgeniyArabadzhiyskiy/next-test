import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const counterSlise = createSlice({
  name: "counter",

  initialState: {
    counter: {
      amount: 0,
      type: "init",
    },
  },

  reducers: {
    setInitialCounter: (state, action) => {
      state.counter = action.payload;
    },

    incrementCounter: (state) => {
      state.counter.amount += 1;
      state.counter.type = "start"
    },

    decrementCounter: (state) => {
      state.counter.amount -= 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      const nextState = {
        ...state,
        ...action.payload.counter,
      };

      if (state.counter.type === "start") {
        nextState.counter = state.counter;
      }
      
      return nextState;

      // if (action.payload.counter.counter === 0) delete action.payload.counter.counter;
    });
  },
});

export const { incrementCounter, decrementCounter, setInitialCounter } =
  counterSlise.actions;

export const counterReduser = counterSlise.reducer;
