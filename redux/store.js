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
//   if (action.type === HYDRATE) {
//     let nextState = {
//       ...state,
//       ...action.payload,
//     };

//     return nextState;
//   } else {
//     return rootReducer(state, action);
//   }
// };

// export const makeStore = () => {
//   let middleware = [pokemonApi.middleware, walletApi.middleware];

//   const store = configureStore({
//     reducer: hydrateReducer,
//     middleware: (gDM) => gDM().concat(middleware),

//     // middleware: (gDM) => gDM().concat(pokemonApi.middleware, walletApi.middleware),
//   });

//   return store;
// };

// export const wrapper = createWrapper(makeStore);

//===============================================================

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { counterReduser } from "./counter/counter";
import { authReducer } from "./auth/authSlice";
import { pokemonApi } from "./pokemonApi";
import { transactionReducer } from "./transactions-slice";
import { walletApi } from "./walletApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [walletApi.reducerPath]: walletApi.reducer,
      transactions: transactionReducer,

      counter: counterReduser,
      auth: authReducer,
    },

    middleware: (gDM) => gDM().concat(pokemonApi.middleware, walletApi.middleware),
  });

export const wrapper = createWrapper(makeStore);

//===========================================================

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
