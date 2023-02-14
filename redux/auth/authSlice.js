import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
  },

  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
    },

    logOut: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
