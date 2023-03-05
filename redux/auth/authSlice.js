import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { userApi } from "../walletApiService/userApi";

const authSlice = createSlice({
  name: "authSlice",

  initialState: {
    user: { firstName: null, email: null, balance: 0 },
    token: global.localStorage?.getItem("token") || null,
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

  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        let nextState = {
          ...state,
          ...action.payload.auth,
        };

        if (state.token) {
          nextState = state;
        }

        return nextState;
      })
      .addMatcher(
        userApi.endpoints.userLogin.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;

          // window.localStorage.setItem("token", action.payload.token);
        }
      )
      .addMatcher(
        userApi.endpoints.userLogout.matchFulfilled,
        (state, action) => {
          state.user = { name: null, email: null, balance: 0 };
          state.token = null;
          state.isLoggedIn = false;

          // window.localStorage.setItem("token", "");
        }
      )
      .addMatcher(
        userApi.endpoints.userRefresh.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
        }
      );
  },
});

export const { logIn, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
