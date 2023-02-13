import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authReducer } from "./auth/authSlice";
import { counterReduser } from "./counter/counter";
import { pokemonApi } from "./pokemonApi";
import { walletApi } from "./walletApi";


export const makeStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [walletApi.reducerPath]: walletApi.reducer,

      counter: counterReduser,
      auth: authReducer,
    },

    middleware: (gDM) => gDM().concat(pokemonApi.middleware, walletApi.middleware),
  });

export const wrapper = createWrapper(makeStore);


// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
