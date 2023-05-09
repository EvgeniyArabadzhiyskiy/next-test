import { BASE_URL } from "@/constants/apiPath";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { getTransactions } from "../transactions-slice";


// function getItems(arg) {
//   const cacheKey = JSON.stringify(arg);
//   const cachedData = myCache.get(cacheKey);
//   if (cachedData) {
//     return Promise.resolve(cachedData);
//   }

//   return fetch('https://example.com/items')
//     .then(response => response.json())
//     .then(data => {
//       myCache.set(cacheKey, data);
//       return data;
//     });
// }


// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY4MzEzMzYzNiwiZXhwIjoxNjg0MzQzMjM2fQ.qhziavWmqDtkfJ25kAlT6yEi0DvNWfVzEorVcBsso7M`;

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      // console.log("token:===========================", token);
      
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

//================= GET ===========================================    
    getAllTransactions: builder.query({
      query: ({pageNum}) => {
        return {
          url: `/transactions?page=${pageNum}&limit=5`,
          method: "GET",
        }
      },

      async onQueryStarted(arg, { dispatch, getState,  queryFulfilled, updateCachedData }) {
        await queryFulfilled
        const { transactions } = getState().transactions
        
        // console.log("GO GO GO");
        // const { data } = await queryFulfilled;
        // dispatch(getTransactions(data));
      },

      transformResponse: (response) => response.transactions,
      providesTags: ["Transaction"],
    }),

//================= CREATE ===========================================    
    addTransaction: builder.mutation({
      query: (body) => ({ url: `/transactions`, method: "POST", body: body }),
      

      async onQueryStarted(body, { dispatch,  queryFulfilled, getCacheEntry }) {
        const {data} =   await queryFulfilled
        const currentCache = getCacheEntry()  // только после    const {data} =   await queryFulfilled
        
        
        // const patchResult = dispatch(
        //   walletApi.util.updateQueryData('getAllTransactions', { pageNum: 2 }, (draft) => {
        //     // console.log("walletApi.util.updateQueryData  draft:", JSON.parse(JSON.stringify(draft)));
            
        //     return [...draft, data]
        //   })
        // )
          // console.log("onQueryStarted  patchResult:", patchResult);


      },
      
    }),
//======================= DELETE ================================
    deleteTransaction: builder.mutation({
      query: (id) => ({ url: `/transactions/${id}`, method: "DELETE" }),

      // invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  util: { getRunningQueriesThunk },
} = walletApi;

export const { getAllTransactions, deleteTransaction } = walletApi.endpoints;
