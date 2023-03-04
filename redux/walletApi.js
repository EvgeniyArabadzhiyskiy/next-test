import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const BASE_URL = "https://wallet-backend-xmk0.onrender.com/api";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3Nzk0NTcxOSwiZXhwIjoxNjc5MTU1MzE5fQ.QSy4e8Qtlmu4tKzK9-i5WfRUhDSrdGjdRx7Cnfb3sac`;

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const walletApi = createApi({
  reducerPath: "walletApi",

  baseQuery,

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  tagTypes: ["Transaction"],

  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: ({ pageNum = 1, limit = 10 } = {}) => ({
        url: `/transactions?page=${pageNum}&limit=5`,
        method: "GET",
      }),

      transformResponse: (response) => response.transactions,

      providesTags: ["Transaction"],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({ url: `/transactions/${id}`, method: "DELETE" }),

      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useDeleteTransactionMutation,
  util: { getRunningQueriesThunk },
} = walletApi;

export const { getAllTransactions, deleteTransaction } = walletApi.endpoints;
