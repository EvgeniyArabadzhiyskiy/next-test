import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const BASE_URL = "https://wallet-backend-xmk0.onrender.com/api";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3NTQ0OTY4OCwiZXhwIjoxNjc2NjU5Mjg4fQ.6gFkCNr2veCVA_bftvsuTlcezKNgwWJ9vQ6MI99zZIQ`;

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
        url: `/transactions?page=${pageNum}&limit=10`,
        method: "GET",
      }),

      providesTags: ["Transaction"],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({ url: `/transactions/${id}`, method: "DELETE" }),

      invalidatesTags: ["Transaction"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllTransactionsQuery,
  useDeleteTransactionMutation,
  util: { getRunningQueriesThunk },
} = walletApi;

// export endpoints for use in SSR
export const { getAllTransactions, deleteTransaction } = walletApi.endpoints;
