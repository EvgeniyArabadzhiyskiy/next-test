import { HYDRATE } from "next-redux-wrapper";
import { baseQuery } from "./baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import {
  USER_CURRENT,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "@/constants/apiPath";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    userRefresh: builder.query({
      query: () => `${USER_CURRENT}`,

      providesTags: ["User"],
    }),

    userRegistration: builder.mutation({
      query: (user) => ({
        url: `${USER_REGISTER}`,
        method: "POST",
        body: user,
      }),

      invalidatesTags: ["User"],
    }),

    userLogin: builder.mutation({
      query: (user) => {
        return ({ url: `${USER_LOGIN}`, method: "POST", body: user })
      },

      invalidatesTags: ["User"],
    }),

    userLogout: builder.mutation({
      query: () => ({ url: `${USER_LOGOUT}`, method: "POST" }),
    }),
  }),
});

export const {
  useUserRegistrationMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserRefreshQuery,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = userApi;

export const { userRegistration, userLogin, userLogout, userRefresh } = userApi.endpoints;
