import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const counterSlise = createSlice({
  name: "counter",

  initialState: {
    counter: 0,
  },

  reducers: {
    setInitialCounter: (state, action) => {
      state.counter = action.payload;
    },

    incrementCounter: (state) => {
      state.counter += 1;
    },

    decrementCounter: (state) => {
      state.counter -= 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // console.log("builder.addCase  state:", state.counter);
      // console.log("action:", action.payload.counter.counter === 0);

      const nextState = {
        ...state,
        ...action.payload.counter,
      };
      
      // console.log("builder.addCase  nextState:", nextState);

      // if (nextState.counter === 10) {
      //   nextState.counter = state.counter
        
      // }


      // if (action.payload.counter.counter === 0) delete action.payload.counter.counter;
      return nextState;
    });
  },
});

export const { incrementCounter, decrementCounter, setInitialCounter } = counterSlise.actions;

export const counterReduser = counterSlise.reducer;
