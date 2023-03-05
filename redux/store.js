// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { createWrapper, HYDRATE } from "next-redux-wrapper";

// import { transactionReducer } from "./transactions-slice";
// import { counterReduser } from "./counter/counter";
// import { authReducer } from "./auth/authSlice";
// import { pokemonApi } from "./pokemonApi";
// import { walletApi } from "./walletApi";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   counter: counterReduser,
//   transactions: transactionReducer,
//   [walletApi.reducerPath]: walletApi.reducer,
//   [pokemonApi.reducerPath]: pokemonApi.reducer,
// });

// const hydrateReducer = (state, action) => {
//   // console.log("hydrateReducer  state:=================================", action.payload);

//   if (action.type === HYDRATE) {
//     let nextState = {
//       ...state,
//       ...action.payload,
//     };

//     // if (state?.counter.counter.type === "start") {
//     //   nextState.counter = state.counter;
//     // }
 
//     return nextState;
//   } else {
//     return rootReducer(state, action);
//   }
// };

// export const makeStore = () => {
//   let middleware = [pokemonApi.middleware, walletApi.middleware];

//   const store = configureStore({
//     reducer: (state, action) => {
//       if (action.type === HYDRATE) {
//         let nextState = {
//           ...state,
//           ...action.payload,
//         };

//         if (state?.counter.counter.type === "start") {
//           nextState.counter = state.counter;
//         }
//         return nextState;

//       } else {
//         const stateData = rootReducer(state, action)
//         return stateData;
//       }
//     },

//     middleware: (gDM) => gDM().concat(middleware),

//   });
//   return store;
// };

// export const wrapper = createWrapper(makeStore);

//===============================================================

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { counterReduser } from "./counter/counter";
import { authReducer } from "./auth/authSlice";
import { pokemonApi } from "./pokemonApi";
import { transactionReducer } from "./transactions-slice";
import { walletApi } from "./walletApiService/walletApi";
import { userApi } from "./walletApiService/userApi";

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReduser,
  transactions: transactionReducer,
  [userApi.reducerPath]: userApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: (state, action) => {
      return rootReducer(state, action)
    },

    middleware: (gDM) =>
      gDM().concat(userApi.middleware,  pokemonApi.middleware, walletApi.middleware),
  });

  return store;
};

export const wrapper = createWrapper(makeStore);

//===========================================================

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
