import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
    },
  },
});

export const { setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
