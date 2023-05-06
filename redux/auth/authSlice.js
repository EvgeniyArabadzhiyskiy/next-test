import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { userApi } from "../walletApiService/userApi";

// const { authToken } = parseCookies();

const initialState = {
  user: { firstName: null, email: null, balance: 0 },
  token: null,
  isLoggedIn: false,
  type: 'server',
};

const authSlice = createSlice({
  name: "authSlice",

  initialState,

  reducers: {
    // logIn: (state, action) => {
    //   state.isLoggedIn = true;
    // },

    // logOut: (state, action) => {
    //   state.isLoggedIn = false;
    // },

    setToken: (state, action) => {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        // console.log(".addCase  HYDRATE:", HYDRATE);
        
        if (state.type === 'server') {
          state.user = action.payload.auth.user
          state.token = action.payload.auth.token
          state.isLoggedIn = action.payload.auth.isLoggedIn
          state.type = 'client'
          
        }

       

        // let nextState = {
        //   ...state,
        //   ...action.payload.auth,
        // };

        // // if (state.token) {
        // //   nextState = state;
        // // }

        // return nextState;
      })
      .addMatcher(
        userApi.endpoints.userLogin.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;

          setCookie(null, "authToken", `${action.payload.token}`, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });

          // document.cookie = `authToken=${action.payload.token}; max-age=${30*24*60*60}`;
        }
      )
      .addMatcher(
        userApi.endpoints.userLogout.matchFulfilled,
        (state, action) => {
          state.user = { name: null, email: null, balance: 0 };
          state.token = null;
          state.isLoggedIn = false;

          destroyCookie(null, "authToken", { path: "/" });

          // document.cookie = `authToken=; max-age=-1`
        }
      )
      .addMatcher(
        userApi.endpoints.userRefresh.matchFulfilled,
        (state, action) => {
          // console.log("REFRESH");
          state.user = action.payload;
          state.isLoggedIn = true;

          // state.token = window.localStorage.getItem('authToken')
          // console.log("window.localStorage.getItem('authToken'):", window.localStorage.getItem('authToken'));
        }
      );
  },
});

export const { logIn, logOut, setToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
